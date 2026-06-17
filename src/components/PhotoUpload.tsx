import { useRef, useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Plus } from 'lucide-react';

interface PhotoUploadProps {
  photos: string[];
  onChange: (photos: string[]) => void;
  maxPhotos?: number;
}

export default function PhotoUpload({
  photos,
  onChange,
  maxPhotos = 9,
}: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      const remaining = maxPhotos - photos.length;
      const filesArray = Array.from(files).slice(0, remaining);

      filesArray.forEach((file) => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          onChange([...photos, result]);
        };
        reader.readAsDataURL(file);
      });
    },
    [photos, onChange, maxPhotos]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleRemove = (index: number) => {
    onChange(photos.filter((_, i) => i !== index));
  };

  const canAddMore = photos.length < maxPhotos;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="font-serif-body text-lg text-charcoal-200 tracking-wide">
          瑕疵照片上传
        </label>
        <span className="text-sm text-charcoal-500 font-serif-body">
          <span className="text-champagne-500">{photos.length}</span> / {maxPhotos}
        </span>
      </div>
      <p className="text-sm text-charcoal-500 font-serif-body -mt-2">
        请上传能清晰展示瑕疵部位的照片，有助于平台更精准估价
      </p>

      {canAddMore && (
        <div
          className={`relative border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-champagne-400 bg-champagne-500/10'
              : 'border-charcoal-700 hover:border-champagne-600/60 hover:bg-charcoal-900/50 bg-charcoal-900/30'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && processFiles(e.target.files)}
          />
          <div className="flex flex-col items-center gap-3">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                isDragging
                  ? 'bg-champagne-500/20 scale-110'
                  : 'bg-charcoal-800/80'
              }`}
            >
              {isDragging ? (
                <ImageIcon className="w-7 h-7 text-champagne-400" />
              ) : (
                <Upload className="w-7 h-7 text-champagne-500" />
              )}
            </div>
            <div>
              <p className="font-serif-body text-lg text-charcoal-200 mb-1">
                {isDragging ? '松开鼠标上传照片' : '拖拽照片到此处，或点击选择'}
              </p>
              <p className="text-sm text-charcoal-500 font-serif-body">
                支持 JPG、PNG、WEBP 格式，单张不超过 10MB
              </p>
            </div>
          </div>
        </div>
      )}

      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-sm overflow-hidden gold-border group"
              style={{
                animation: `fade-up 0.4s ease-out ${index * 0.05}s both`,
              }}
            >
              <img
                src={photo}
                alt={`瑕疵照片 ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/60 transition-all duration-300" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-burgundy-700/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-burgundy-600 hover:scale-110"
              >
                <X className="w-4 h-4 text-white" strokeWidth={2.5} />
              </button>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-charcoal-950/80 text-[10px] text-champagne-300 rounded-sm tracking-wider">
                #{index + 1}
              </div>
            </div>
          ))}
          {canAddMore && (
            <button
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-sm border-2 border-dashed border-charcoal-700 hover:border-champagne-500/60 bg-charcoal-900/20 hover:bg-charcoal-900/50 flex flex-col items-center justify-center gap-2 transition-all duration-300 group"
            >
              <Plus className="w-8 h-8 text-charcoal-600 group-hover:text-champagne-500 transition-colors" />
              <span className="text-xs text-charcoal-500 group-hover:text-champagne-400 font-serif-body transition-colors">
                添加照片
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
