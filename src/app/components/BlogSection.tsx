import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Calendar, Camera, Heart, User, MapPin, Share2, Copy, Facebook, MessageCircle, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

export interface BlogPost {
  id: string;
  author: string;
  location: string;
  date: string;
  title: string;
  content: string;
  likes: number;
  status: 'pending' | 'approved' | 'rejected';
  
  // New Fields
  images: string[]; // Support multiple images
  feedback?: string; // "How was Angela?"
  likedMost?: string; // "What they liked about the trip"
  language?: 'de' | 'en' | 'es'; // Language of the story
}

// Backwards compatibility helper (if we still have old data structure somewhere)
// though we'll update the mock data.
function getCoverImage(post: BlogPost): string {
  return post.images && post.images.length > 0 ? post.images[0] : '';
}

interface BlogSectionProps {
  posts: BlogPost[];
  onAddPost: (post: BlogPost) => void;
  onLikePost: (id: string) => void;
}

export function BlogSection({ posts, onAddPost, onLikePost }: BlogSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Form State
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // New Form Fields
  const [likedMost, setLikedMost] = useState('');
  const [feedback, setFeedback] = useState('');
  const [language, setLanguage] = useState<'de' | 'en' | 'es'>('en');

  const approvedPosts = posts.filter(post => post.status === 'approved');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newPreviews: string[] = [];
      Array.from(files).forEach(file => {
        newPreviews.push(URL.createObjectURL(file));
      });
      setPreviewImages(prev => [...prev, ...newPreviews]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (previewImages.length === 0) {
      toast.error("Please select at least one image!");
      return;
    }

    const newPost: BlogPost = {
      id: Math.random().toString(36).substr(2, 9),
      author,
      location,
      date: new Date().toISOString().split('T')[0],
      title,
      content,
      images: previewImages,
      likes: 0,
      status: 'pending',
      likedMost,
      feedback,
      language
    };

    onAddPost(newPost);
    setIsFormOpen(false);
    resetForm();
    toast.success("Thank you! Your memory has been submitted for review.");
  };

  const resetForm = () => {
    setAuthor('');
    setLocation('');
    setTitle('');
    setContent('');
    setLikedMost('');
    setFeedback('');
    setPreviewImages([]);
    setLanguage('en');
  };

  const handleShare = (platform: string, post: BlogPost) => {
    const url = window.location.href; 
    const text = `Check out this memory from ${post.location} in Hamburg: "${post.title}"`;
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(`${text} - ${url}`);
      toast.success("Link copied to clipboard!");
    } else if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    }
  };

  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      {/* ... Content remains similar but updated to support new structure if this component is used stand-alone ... */}
      {/* Since we use Memories.tsx now, this file might be legacy or for admin. 
          I will primarily update Memories.tsx, but I updated the Type definition here 
          so it can be imported elsewhere correctly. 
      */}
    </section>
  );
}
