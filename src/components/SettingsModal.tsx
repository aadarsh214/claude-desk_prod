import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsModal = ({ open, onOpenChange }: SettingsModalProps) => {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (open && user) {
      checkForExistingKey();
    }
  }, [open, user]);

  const checkForExistingKey = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('user_id', user.id)
      .eq('provider', 'openrouter')
      .single();

    setHasKey(!!data && !error);
  };

  const handleSave = async () => {
    if (!user) return;
    if (!apiKey.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an API key',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('api_keys')
        .upsert({
          user_id: user.id,
          encrypted_key: apiKey,
          provider: 'openrouter',
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'API key saved successfully',
      });
      setHasKey(true);
      setApiKey('');
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save API key',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('user_id', user.id)
        .eq('provider', 'openrouter');

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'API key deleted successfully',
      });
      setHasKey(false);
      setApiKey('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete API key',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your OpenRouter API key. Get your key from{' '}
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              openrouter.ai/keys
            </a>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">OpenRouter API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder={hasKey ? '••••••••••••••••' : 'sk-or-v1-...'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            {hasKey && (
              <p className="text-sm text-muted-foreground">
                You have an API key saved. Enter a new one to replace it.
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={loading} className="flex-1">
              {loading ? 'Saving...' : hasKey ? 'Update Key' : 'Save Key'}
            </Button>
            {hasKey && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
