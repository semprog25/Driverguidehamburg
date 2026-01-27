import React, { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Plus, MapPin, Camera, X, User, Star, Globe, Share2, ChevronRight, ChevronLeft } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { BlogPost } from '@/app/components/BlogSection';
import { Drawer } from 'vaul';
import Slider from 'react-slick';
import { useLanguage } from '@/app/context/LanguageContext';
import { GalleryItem } from '@/app/components/AdminPanel';
import { toast } from 'sonner';

interface MemoriesProps {
  posts: BlogPost[];
  galleryItems: GalleryItem[];
  onAddPost: (post: BlogPost) => void;
  onLikePost: (id: string) => void;
}

export function Memories({ posts, galleryItems, onAddPost, onLikePost }: MemoriesProps) {
  const { t, language: currentAppLanguage } = useLanguage();
  const approvedPosts = posts.filter(post => post.status === 'approved');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullscreenPost, setFullscreenPost] = useState<BlogPost | null>(null);
  
  // Form State
  const [newPost, setNewPost] = useState<{
    title: string;
    content: string;
    author: string;
    location: string;
    images: string[];
    likedMost: string;
    feedback: string;
    language: 'de' | 'en' | 'es';
  }>({
    title: '', content: '', author: '', location: '', images: [], likedMost: '', feedback: '', language: currentAppLanguage as 'de' | 'en' | 'es'
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
       const newUrls: string[] = [];
       Array.from(files).forEach(file => {
          newUrls.push(URL.createObjectURL(file));
       });
       setNewPost(prev => ({ ...prev, images: [...prev.images, ...newUrls] }));
    }
  };

  const copyToClipboard = (text: string) => {
    // Try using the Async Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
            .then(() => toast.success("Link copied to clipboard!"))
            .catch((err) => {
                console.error("Clipboard API failed:", err);
                fallbackCopyTextToClipboard(text);
            });
    } else {
        fallbackCopyTextToClipboard(text);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
      try {
          const textArea = document.createElement("textarea");
          textArea.value = text;
          // Avoid scrolling to bottom
          textArea.style.top = "0";
          textArea.style.left = "0";
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          if (successful) {
              toast.success("Link copied to clipboard!");
          } else {
              toast.error("Could not copy link.");
          }
      } catch (err) {
          console.error("Fallback copy failed:", err);
          toast.error("Could not copy link automatically.");
      }
  };

  const handleShare = async (post: BlogPost) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `DriverGuide Hamburg: ${post.title}`,
          text: `Check out this memory from ${post.author} on their Hamburg tour with Angela!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      copyToClipboard(window.location.href);
    }
  };

  const handleShareGalleryItem = async (item: GalleryItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `DriverGuide Hamburg: ${item.title}`,
          text: item.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      copyToClipboard(window.location.href);
    }
  };

  const handleSubmit = () => {
    if (!newPost.title || !newPost.content || !newPost.author) {
        alert("Please fill in all required fields (Name, Title, Story).");
        return;
    }

    const post: BlogPost = {
        id: Math.random().toString(36).substr(2, 9),
        title: newPost.title,
        content: newPost.content,
        author: newPost.author,
        location: newPost.location || 'Hamburg',
        date: new Date().toISOString().split('T')[0],
        imageUrl: newPost.images[0] || 'https://images.unsplash.com/photo-1596791657688-66236b28b788?auto=format&fit=crop&q=80',
        images: newPost.images,
        likes: 0,
        status: 'pending',
        likedMost: newPost.likedMost,
        feedback: newPost.feedback,
        language: newPost.language
    };

    onAddPost(post);
    setNewPost({ title: '', content: '', author: '', location: '', images: [], likedMost: '', feedback: '', language: currentAppLanguage as 'de' | 'en' | 'es' });
    setIsModalOpen(false);
  };

  // Gallery Slider Settings
  const gallerySliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                arrows: false // Cleaner on mobile
            }
        }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-32 md:pb-12">
      {/* Dynamic Hero Header */}
      <div className="relative h-56 md:h-[50vh] min-h-[300px] w-full overflow-hidden rounded-b-[3rem] md:rounded-b-[4rem] shadow-sm bg-slate-900">
        <ImageWithFallback 
          src="https://qoqbdiixztolvtcjdnle.supabase.co/storage/v1/object/public/Angela/Angela's%20heart-filled%20smartphone%20moment.png"
          alt="Angela loving the memories"
          className="w-full h-full object-cover object-top opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-white max-w-7xl mx-auto w-full px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-bold mb-2 tracking-tight"
                >
                  {t('memories.title')}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="opacity-90 text-sm md:text-xl font-medium max-w-lg"
                >
                  {t('memories.subtitle')}
                </motion.p>
             </div>
             
             {/* Desktop Add Button */}
             <button 
               onClick={() => setIsModalOpen(true)}
               className="hidden md:flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all hover:scale-105 shadow-xl"
             >
               <Plus size={20} /> {t('memories.shareBtn')}
             </button>
          </div>
        </div>
      </div>

      {/* Masonry Grid - Guest Memories */}
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 600: 2, 900: 3, 1400: 4}}>
          <Masonry gutter="24px">
            {approvedPosts.map((post) => (
              <MemoryCard 
                key={post.id} 
                post={post} 
                onLike={() => onLikePost(post.id)} 
                onShare={() => handleShare(post)}
                onClick={() => setFullscreenPost(post)}
                t={t}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      {/* Angela's Gallery Section */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-12 md:mt-24 mb-16 overflow-hidden">
          <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 font-serif italic">"My View of Hamburg & Beyond"</h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg">Echte Erlebnisse aus Hamburg und Norddeutschland. Lass dich inspirieren und buche deine individuelle Tour.</p>
          </div>
          
          <div className="gallery-slider-wrapper pb-10">
              <Slider {...gallerySliderSettings}>
                {galleryItems.map((item) => (
                    <div key={item.id} className="px-3 h-full">
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-white p-4 pb-8 rounded-t-[10rem] rounded-b-2xl shadow-xl shadow-slate-200/50 group relative h-full flex flex-col"
                        >
                            <div className="aspect-[3/4] rounded-t-[9rem] rounded-b-lg overflow-hidden mb-6 relative flex-shrink-0">
                                <ImageWithFallback src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                
                                {/* Share Button Overlay */}
                                <button 
                                    onClick={() => handleShareGalleryItem(item)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-700 hover:text-primary hover:scale-110 transition-all shadow-md z-10 opacity-0 group-hover:opacity-100"
                                    title="Share this story"
                                >
                                    <Share2 size={18} />
                                </button>
                            </div>
                            <div className="text-center px-2 flex-grow flex flex-col justify-start">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                                <p className="text-slate-500 italic font-serif leading-relaxed line-clamp-4">"{item.description}"</p>
                            </div>
                        </motion.div>
                    </div>
                ))}
              </Slider>
          </div>
      </div>

      {/* Mobile FAB - Moved Up */}
      <div className="md:hidden">
        <Drawer.Root>
            <Drawer.Trigger asChild>
            <button className="fixed bottom-28 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center z-40 animate-bounce-subtle">
                <Plus size={28} />
            </button>
            </Drawer.Trigger>
            <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
            <Drawer.Content className="bg-white flex flex-col rounded-t-[20px] h-[90vh] mt-24 fixed bottom-0 left-0 right-0 z-50 outline-none">
                <div className="p-4 bg-white rounded-t-[20px] flex-1 overflow-y-auto">
                    <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-slate-300 mb-6" />
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">{t('memories.form.title')}</h3>
                    <PostForm 
                        newPost={newPost} 
                        setNewPost={setNewPost} 
                        handleImageUpload={handleImageUpload}
                        t={t}
                    />
                     <Drawer.Close asChild>
                        <button 
                            onClick={handleSubmit}
                            className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 mt-8 active:scale-95 transition-transform"
                        >
                            {t('memories.form.submit')}
                        </button>
                    </Drawer.Close>
                </div>
            </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
      </div>

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {fullscreenPost && (
          <FullscreenGallery post={fullscreenPost} onClose={() => setFullscreenPost(null)} t={t} />
        )}
      </AnimatePresence>

      {/* Desktop Add Post Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm hidden md:block"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-[70] p-8 hidden md:flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-bold text-slate-900">{t('memories.form.title')}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} className="text-slate-500" />
                </button>
              </div>
              
              <div className="overflow-y-auto flex-1 pr-2">
                 <PostForm 
                    newPost={newPost} 
                    setNewPost={setNewPost} 
                    handleImageUpload={handleImageUpload} 
                    t={t}
                 />
              </div>
              
              <div className="pt-6 border-t border-slate-100 mt-6">
                <button 
                    onClick={handleSubmit}
                    className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-amber-600 transition-colors"
                >
                    {t('memories.form.submit')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MemoryCard({ post, onLike, onShare, onClick, t }: { post: BlogPost, onLike: () => void, onShare: () => void, onClick: () => void, t: any }) {
    // If no images array, fallback to imageUrl
    const images = post.images && post.images.length > 0 ? post.images : [post.imageUrl];
    const hasMultiple = images.length > 1;

    // Flag mapping
    const flags: Record<string, string> = {
        'de': '🇩🇪',
        'en': '🇬🇧',
        'es': '🇪🇸'
    };
    const flag = post.language ? flags[post.language] : '';

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 break-inside-avoid hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={onClick}
        >
            <div className="relative group bg-slate-100" onClick={(e) => e.stopPropagation()}>
                {/* Image Section - Can be slider or single image */}
                <div className="relative aspect-[4/3] overflow-hidden" onClick={onClick}>
                     {hasMultiple ? (
                         // Show first image, indicate multiple
                         <>
                            <ImageWithFallback src={images[0]} alt={post.title} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                <Camera size={12} /> +{images.length - 1}
                            </div>
                         </>
                     ) : (
                        <ImageWithFallback src={images[0]} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                     )}
                     
                     <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-1 text-slate-700">
                         <MapPin size={10} className="text-primary" /> {post.location}
                     </div>

                     {flag && (
                         <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs shadow-sm">
                             {flag}
                         </div>
                     )}
                </div>
            </div>

            <div className="p-5">
                <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2">{post.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-3 mb-4 leading-relaxed">{post.content}</p>
                
                {/* Metadata Tags */}
                {(post.likedMost || post.feedback) && (
                    <div className="mb-4 space-y-2">
                        {post.likedMost && (
                            <div className="flex gap-2 items-start bg-yellow-50 p-2 rounded-lg">
                                <Star size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                                <div className="text-xs text-slate-700">
                                    <span className="font-bold">{t('memories.card.highlight')}:</span> {post.likedMost}
                                </div>
                            </div>
                        )}
                        {post.feedback && (
                            <div className="flex gap-2 items-start bg-teal-50 p-2 rounded-lg">
                                <User size={14} className="text-teal-500 mt-0.5 flex-shrink-0" />
                                <div className="text-xs text-slate-700">
                                    <span className="font-bold">{t('memories.card.feedback')}:</span> {post.feedback}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex justify-between items-center border-t border-slate-50 pt-3" onClick={(e) => e.stopPropagation()}>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">{t('memories.card.by')} {post.author}</span>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onShare(); }}
                            className="text-slate-300 hover:text-primary transition-colors p-1"
                            title="Share"
                        >
                            <Share2 size={16} />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onLike(); }}
                            className="flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-colors group p-1"
                        >
                            <Heart size={18} className={`transition-transform group-active:scale-125 ${post.likes > 0 ? "fill-red-500 text-red-500" : ""}`} />
                            <span className="text-xs font-bold">{post.likes}</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function FullscreenGallery({ post, onClose, t }: { post: BlogPost, onClose: () => void, t: any }) {
    const images = post.images && post.images.length > 0 ? post.images : [post.imageUrl];
    
    // Slider settings for fullscreen
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: "fullscreen-slider h-full",
        adaptiveHeight: false,
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
        >
            {/* Header */}
            <div className="flex justify-between items-center p-4 text-white bg-gradient-to-b from-black/50 to-transparent absolute top-0 left-0 right-0 z-10">
                <div>
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-xs opacity-70">{t('memories.card.by')} {post.author}</p>
                </div>
                <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Slider */}
            <div className="flex-1 flex items-center justify-center overflow-hidden p-4 md:p-10">
                 <div className="w-full max-w-5xl h-full flex items-center justify-center">
                    {images.length > 1 ? (
                        <Slider {...settings} className="w-full">
                            {images.map((img, i) => (
                                <div key={i} className="h-[70vh] md:h-[80vh] flex items-center justify-center outline-none">
                                    <img src={img} alt={`Slide ${i}`} className="max-h-full max-w-full mx-auto object-contain" />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                         <img src={images[0]} alt={post.title} className="max-h-full max-w-full object-contain" />
                    )}
                 </div>
            </div>

            {/* Bottom Content Info */}
            <div className="bg-black/80 backdrop-blur-md p-6 text-white pb-12 md:pb-6">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-4 mb-4 text-sm opacity-70">
                        <span className="flex items-center gap-1"><MapPin size={14} /> {post.location}</span>
                        <span className="flex items-center gap-1"><Heart size={14} className="fill-white" /> {post.likes}</span>
                        {post.language && (
                            <span className="flex items-center gap-1 ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                <Globe size={12} /> {post.language.toUpperCase()}
                            </span>
                        )}
                    </div>
                    <p className="text-sm md:text-base leading-relaxed opacity-90">{post.content}</p>
                    
                    {(post.likedMost || post.feedback) && (
                        <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                            {post.likedMost && (
                                <div>
                                    <h4 className="text-xs uppercase tracking-wider font-bold text-yellow-400 mb-1">{t('memories.card.highlight')}</h4>
                                    <p className="text-sm italic text-slate-300">"{post.likedMost}"</p>
                                </div>
                            )}
                            {post.feedback && (
                                <div>
                                    <h4 className="text-xs uppercase tracking-wider font-bold text-teal-400 mb-1">{t('memories.card.feedback')}</h4>
                                    <p className="text-sm italic text-slate-300">"{post.feedback}"</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// Shared Form Component
function PostForm({ newPost, setNewPost, handleImageUpload, t }: any) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{t('memories.form.name')}</label>
                    <input 
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="e.g. The Müller Family"
                        value={newPost.author}
                        onChange={e => setNewPost({...newPost, author: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{t('memories.form.location')}</label>
                    <input 
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="e.g. Harbor Tour"
                        value={newPost.location}
                        onChange={e => setNewPost({...newPost, location: e.target.value})}
                    />
                </div>
            </div>
            
            {/* Language Selection */}
            <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1">Language of your story</label>
                 <div className="flex gap-2">
                     {['de', 'en', 'es'].map((lang) => (
                         <button
                            key={lang}
                            onClick={() => setNewPost({...newPost, language: lang})}
                            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                                newPost.language === lang 
                                ? 'bg-primary text-white border-primary shadow-md' 
                                : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                            }`}
                         >
                            {lang === 'de' ? '🇩🇪 Deutsch' : lang === 'en' ? '🇬🇧 English' : '🇪🇸 Español'}
                         </button>
                     ))}
                 </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">{t('memories.form.photo')}</label>
                <div className="relative">
                    <input 
                    type="file" 
                    accept="image/*"
                    multiple
                    className="hidden" 
                    id="photo-upload-input"
                    onChange={handleImageUpload}
                    />
                    <label 
                        htmlFor="photo-upload-input"
                        className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400 cursor-pointer hover:bg-slate-100 transition-colors hover:border-primary/50"
                    >
                        <Camera size={24} className="mb-2" />
                        <span className="text-sm font-medium">{t('memories.form.photoHint')}</span>
                        <span className="text-xs opacity-70">{t('memories.form.uploadPreview')}</span>
                    </label>
                </div>
                {/* Preview Strip */}
                {newPost.images.length > 0 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                        {newPost.images.map((img: string, i: number) => (
                            <div key={i} className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                                <img src={img} className="w-full h-full object-cover" alt="preview" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">{t('memories.form.memoryTitle')}</label>
                <input 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Best day ever!"
                    value={newPost.title}
                    onChange={e => setNewPost({...newPost, title: e.target.value})}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1">{t('memories.form.highlight')}</label>
                     <input 
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="e.g. The hidden photo spots"
                        value={newPost.likedMost}
                        onChange={e => setNewPost({...newPost, likedMost: e.target.value})}
                    />
                </div>
                <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1">{t('memories.form.angelaFeedback')}</label>
                     <input 
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="e.g. Super friendly!"
                        value={newPost.feedback}
                        onChange={e => setNewPost({...newPost, feedback: e.target.value})}
                    />
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">{t('memories.form.story')}</label>
                <textarea 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all h-24 resize-none"
                    placeholder="What made this moment special?"
                    value={newPost.content}
                    onChange={e => setNewPost({...newPost, content: e.target.value})}
                />
            </div>
        </div>
    );
}