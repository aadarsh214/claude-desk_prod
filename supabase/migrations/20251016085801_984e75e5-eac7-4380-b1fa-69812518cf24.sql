-- Create profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz default now() not null
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Profiles policies: users can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Create api_keys table for storing user API keys
create table public.api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  encrypted_key text not null,
  provider text not null default 'openrouter',
  created_at timestamptz default now() not null,
  last_used_at timestamptz,
  unique(user_id, provider)
);

-- Enable RLS on api_keys
alter table public.api_keys enable row level security;

-- API keys policies: users can only access their own keys
create policy "Users can view own api keys"
  on public.api_keys for select
  using (auth.uid() = user_id);

create policy "Users can insert own api keys"
  on public.api_keys for insert
  with check (auth.uid() = user_id);

create policy "Users can update own api keys"
  on public.api_keys for update
  using (auth.uid() = user_id);

create policy "Users can delete own api keys"
  on public.api_keys for delete
  using (auth.uid() = user_id);

-- Create conversations table
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null default 'New Chat',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS on conversations
alter table public.conversations enable row level security;

-- Conversations policies
create policy "Users can view own conversations"
  on public.conversations for select
  using (auth.uid() = user_id);

create policy "Users can insert own conversations"
  on public.conversations for insert
  with check (auth.uid() = user_id);

create policy "Users can update own conversations"
  on public.conversations for update
  using (auth.uid() = user_id);

create policy "Users can delete own conversations"
  on public.conversations for delete
  using (auth.uid() = user_id);

-- Create messages table
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now() not null
);

-- Enable RLS on messages
alter table public.messages enable row level security;

-- Messages policies: users can only access messages from their conversations
create policy "Users can view messages from own conversations"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations
      where conversations.id = messages.conversation_id
      and conversations.user_id = auth.uid()
    )
  );

create policy "Users can insert messages to own conversations"
  on public.messages for insert
  with check (
    exists (
      select 1 from public.conversations
      where conversations.id = messages.conversation_id
      and conversations.user_id = auth.uid()
    )
  );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

-- Trigger to create profile on user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update conversation updated_at timestamp
create or replace function public.update_conversation_timestamp()
returns trigger
language plpgsql
as $$
begin
  update public.conversations
  set updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$;

-- Trigger to update conversation timestamp when message is added
create trigger on_message_created
  after insert on public.messages
  for each row execute procedure public.update_conversation_timestamp();

-- Enable realtime for conversations and messages
alter publication supabase_realtime add table public.conversations;
alter publication supabase_realtime add table public.messages;