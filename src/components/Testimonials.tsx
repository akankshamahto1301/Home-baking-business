import { FormEvent, useEffect, useState } from 'react';
import { Star, Quote, ImagePlus, X } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fetchReviews, submitReview, Review } from '@/services/reviewService';

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      const data = await fetchReviews();
      setReviews(data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  }
  
  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Please select an image file.');
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert('Please select an image smaller than 5MB.');
    return;
  }

  setPhoto(file);
  setPhotoPreview(URL.createObjectURL(file));
}

function removePhoto() {
  if (photoPreview) {
    URL.revokeObjectURL(photoPreview);
  }

  setPhoto(null);
  setPhotoPreview('');
}

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !review.trim() || rating === 0) {
      alert('Please select a rating.');
      return;
    }

    setSubmitting(true);

    try {
      await submitReview({
        name: name.trim(),
        review: review.trim(),
        rating,
        category: category.trim(),
        photo,
      });

      setName('');
      setReview('');
      setRating(0);
      setCategory('');
      setPhoto(null);
      setPhotoPreview('');
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section-padding bg-cream-100">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div
          ref={ref}
          className={`mx-auto mb-12 max-w-2xl text-center ${
            isVisible ? 'is-visible' : ''
          } reveal`}
        >
          <p className="heading-eyebrow">Testimonials</p>

          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-cocoa-600 sm:text-4xl lg:text-5xl">
            Sweet Words From Our Customers
          </h2>
        </div>

        {/* Reviews */}
        {loading ? (
          <div className="py-10 text-center text-sm text-cocoa-300">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-10 text-center text-sm text-cocoa-300">
            No reviews yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {reviews.map((t) => (
              <figure
  key={t.id}
  className="relative flex flex-col rounded-2xl bg-cream-50 px-8 py-7 shadow-md shadow-cocoa-900/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cocoa-900/10"
>
  {/* Quote + Rating */}
  <div className="mb-5 flex items-start justify-between">
    <Quote
      className="h-10 w-10 text-blush-200"
      strokeWidth={2.5}
    />

    <div className="flex gap-1 pt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < t.rating
              ? 'fill-gold-400 text-gold-400'
              : 'text-cream-300'
          }`}
          strokeWidth={2}
        />
      ))}
    </div>
  </div>

  {/* Review */}
  <blockquote className="text-base leading-7 text-cocoa-400">
    "{t.review}"
  </blockquote>

  {/* Customer + Product */}
  <figcaption className="mt-5 border-t border-cream-300 pt-5">
    <p className="font-serif text-xl font-semibold text-cocoa-600">
      {t.name}
    </p>

    {t.category && (
      <span className="mt-3 inline-flex rounded-full bg-blush-50 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-cocoa-500">
        {t.category}
      </span>
    )}
  </figcaption>
</figure>
            ))}
          </div>
        )}

        {/* Review Form */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="rounded-2xl bg-cream-50 p-6 shadow-md shadow-cocoa-900/5 sm:p-8">
            <div className="mb-6 text-center">
              <p className="heading-eyebrow">Share Your Experience</p>

              <h3 className="font-serif text-2xl font-semibold text-cocoa-600">
                We'd Love to Hear From You
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-cocoa-500">
                  Your Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-cream-300 bg-cream-100 px-4 py-3 text-sm text-cocoa-600 outline-none transition focus:border-cocoa-300"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="mb-2 block text-sm font-medium text-cocoa-500">
                  Your Rating
                </label>

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i + 1)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          i < rating
                            ? 'fill-gold-400 text-gold-400'
                            : 'text-cream-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-cocoa-500">
                  Category
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="cupcake, brownie, cookies, etc."
                  className="w-full rounded-xl border border-cream-300 bg-cream-100 px-4 py-3 text-sm text-cocoa-600 outline-none transition focus:border-cocoa-300"
                />
              </div>

              {/* Review */}
              <div>
                <label className="mb-2 block text-sm font-medium text-cocoa-500">
                  Your Review
                </label>

                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Tell us about your experience..."
                  required
                  rows={4}
                  className="w-full resize-none rounded-xl border border-cream-300 bg-cream-100 px-4 py-3 text-sm text-cocoa-600 outline-none transition focus:border-cocoa-300"
                />
              </div>

                    {/* Photo */}
<div>
  <label className="mb-2 block text-sm font-medium text-cocoa-500">
    Share Your Memory
    <span className="ml-1 text-xs font-normal text-cocoa-300">
      (optional)
    </span>
  </label>

  {!photoPreview ? (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-cream-300 bg-cream-100 px-6 py-8 text-center transition hover:border-blush-300 hover:bg-blush-50/30">
      <ImagePlus className="h-8 w-8 text-blush-300" />

      <span className="mt-3 text-sm font-medium text-cocoa-500">
        Add a photo from your celebration
      </span>

      <span className="mt-1 text-xs text-cocoa-300">
        JPG, PNG or WEBP · Max 5MB
      </span>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handlePhotoChange}
        className="hidden"
      />
    </label>
  ) : (
    <div className="relative overflow-hidden rounded-xl border border-cream-300 bg-cream-100">
      <img
        src={photoPreview}
        alt="Your selected memory"
        className="max-h-64 w-full object-cover"
      />

      <button
        type="button"
        onClick={removePhoto}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cocoa-900/70 text-white transition hover:bg-cocoa-900"
        aria-label="Remove photo"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="px-4 py-3 text-xs text-cocoa-400">
        {photo?.name}
      </div>
    </div>
  )}
</div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-cocoa-500 px-6 py-3 text-sm font-medium text-cream-100 transition-all duration-300 hover:bg-cocoa-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>

              {submitted && (
                <p className="text-center text-sm text-green-600">
                  Thank you! Your review has been submitted and is awaiting approval.
                </p>
              )}
            </form>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-cocoa-300">
          Reviews are displayed after approval.
        </p>
      </div>
    </section>
  );
}