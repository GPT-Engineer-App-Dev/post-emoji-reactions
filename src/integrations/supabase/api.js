import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to handle Supabase queries
const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

// Fetch all posts
export const usePosts = () => useQuery({
  queryKey: ['posts'],
  queryFn: () => fromSupabase(supabase.from('posts').select('*')),
});

// Add a new post
export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost) => fromSupabase(supabase.from('posts').insert([newPost])),
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });
};

// Fetch all reactions for a post
export const useReactions = (postId) => useQuery({
  queryKey: ['reactions', postId],
  queryFn: () => fromSupabase(supabase.from('reactions').select('*').eq('post_id', postId)),
});

// Add a new reaction
export const useAddReaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newReaction) => fromSupabase(supabase.from('reactions').insert([newReaction])),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['reactions', variables.post_id]);
    },
  });
};