import { FormEvent, useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fetchReviews, submitReview, Review } from '@/services/reviewService';
import { copy } from '@/data/copy';

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadReviews() {
      try {
        const data = await fetchReviews();
        if (!cancelled) {
          setReviews(data);
        }
      } catch (error) {
        console.error('Failed to load reviews:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    const failsafe = window.setTimeout(() => {
      if (!cancelled) {
        setLoading(false);
      }
    }, 8000);

    loadReviews();

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !review.trim() || rating === 0) {
      setFormError(copy.reviews.errors.required);
      return;
    }

    setFormError('');
    setSubmitting(true);

    try {
      await submitReview({
        name: name.trim(),
        review: review.trim(),
        rating,
        category: category.trim(),
      });

      setName('');
      setReview('');
      setRating(0);
      setHoverRating(0);
      setCategory('');
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to submit review:', error);
      setFormError(copy.reviews.errors.submit);
    } finally {
      setSubmitting(false);
    }
  }

  const shownStars = hoverRating || rating;

  return (
    <section id="reviews" className="section-padding bg-cream-100">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`mx-auto mb-12 max-w-2xl text-center ${
            isVisible ? 'is-visible' : ''
          } reveal`}
        >
          <p className="heading-eyebrow">{copy.reviews.eyebrow}</p>

          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-cocoa-600 sm:text-4xl lg:text-5xl">
            {copy.reviews.heading}
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-52 animate-pulse rounded-2xl bg-cream-200" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-10 text-center text-sm text-cocoa-300">
            {copy.reviews.empty}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {reviews.map((t) => (
              <figure
                key={t.id}
                className="relative flex flex-col rounded-2xl bg-cream-50 px-8 py-7 shadow-md shadow-cocoa-900/5"
              >
                {t.photoUrl && (
                  <img
                    src={t.photoUrl}
                    alt=""
                    className="mb-5 h-40 w-full rounded-xl object-cover"
                  />
                )}

                <div className="mb-5 flex items-start justify-between">
                  <Quote className="h-10 w-10 text-blush-200" strokeWidth={2.5} />

                  <div
                    className="flex gap-1 pt-1"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < t.rating
                            ? 'fill-gold-400 text-gold-400'
                            : 'text-cream-300'
                        }`}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="text-base leading-7 text-cocoa-400">
                  "{t.review}"
                </blockquote>

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

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="rounded-2xl bg-cream-50 p-6 shadow-md shadow-cocoa-900/5 sm:p-8">
            <div className="mb-6 text-center">
              <p className="heading-eyebrow">{copy.reviews.formEyebrow}</p>

              <h3 className="font-serif text-2xl font-semibold text-cocoa-600">
                {copy.reviews.formHeading}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="review-name" className="mb-2 block text-sm font-medium text-cocoa-500">
                  {copy.reviews.nameLabel}
                </label>

                <input
                  id="review-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={copy.reviews.namePlaceholder}
                  required
                  className="w-full rounded-xl border border-cream-300 bg-cream-100 px-4 py-3 text-sm text-cocoa-600 outline-none transition focus:border-cocoa-300"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-cocoa-500">
                  {copy.reviews.ratingLabel}
                </label>

                <div
                  role="radiogroup"
                  aria-label="Your rating out of 5 stars"
                  className="flex gap-1"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="radio"
                      aria-checked={rating === i + 1}
                      aria-label={`${i + 1} star${i === 0 ? '' : 's'}`}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onFocus={() => setHoverRating(i + 1)}
                      onBlur={() => setHoverRating(0)}
                      onClick={() => setRating(i + 1)}
                      className="flex h-11 w-11 items-center justify-center rounded-full"
                    >
                      <Star
                        className={`h-6 w-6 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          i < shownStars
                            ? 'fill-gold-400 text-gold-400'
                            : 'text-cream-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="review-category" className="mb-2 block text-sm font-medium text-cocoa-500">
                  {copy.reviews.categoryLabel}
                </label>

                <input
                  id="review-category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder={copy.reviews.categoryPlaceholder}
                  className="w-full rounded-xl border border-cream-300 bg-cream-100 px-4 py-3 text-sm text-cocoa-600 outline-none transition focus:border-cocoa-300"
                />
              </div>

              <div>
                <label htmlFor="review-text" className="mb-2 block text-sm font-medium text-cocoa-500">
                  {copy.reviews.reviewLabel}
                </label>

                <textarea
                  id="review-text"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder={copy.reviews.reviewPlaceholder}
                  required
                  rows={4}
                  className="w-full resize-none rounded-xl border border-cream-300 bg-cream-100 px-4 py-3 text-sm text-cocoa-600 outline-none transition focus:border-cocoa-300"
                />
              </div>

              {formError && (
                <p role="alert" className="text-center text-sm text-blush-600">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-cocoa-500 px-6 py-3 text-sm font-medium text-cream-100 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-cocoa-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? copy.reviews.submitting : copy.reviews.submit}
              </button>

              {submitted && (
                <p className="text-center text-sm text-cocoa-500">
                  {copy.reviews.success}
                </p>
              )}
            </form>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-cocoa-300">
          {copy.reviews.approvalNote}
        </p>
      </div>
    </section>
  );
}
