import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/projects.module.css';
import { projects } from '../lib/projects-data';

function GithubStats({ repository }) {
    if (!repository) return null;

    const updated = new Intl.DateTimeFormat('en', {
        month: 'short',
        year: 'numeric',
    }).format(new Date(repository.updatedAt));

    return (
        <div className={styles.githubStats} aria-label={`GitHub statistics for ${repository.name}`}>
            <span aria-label={`${repository.stars} GitHub stars`}>★ {repository.stars}</span>
            <span aria-label={`${repository.forks} GitHub forks`}>⑂ {repository.forks}</span>
            <span>Updated {updated}</span>
        </div>
    );
}

const STATUS_CLASS = {
    'early-access': styles.statusEarlyAccess,
    completed: styles.statusCompleted,
    'in-progress': styles.statusInProgress,
};

const FOCAL = 0.5;
const N = projects.length;
// Render three copies back to back so the carousel can scroll infinitely in
// either direction; the middle copy is the "home" range we silently snap
// back into once the user scrolls/clicks into a cloned copy.
const LOOPED = [...projects, ...projects, ...projects];

export default function Projects({ github }) {
    const trackRef = useRef(null);
    const cardRefs = useRef([]);
    const activeRenderedIndexRef = useRef(N);
    const settleTimerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const repositoryByName = new Map(
        (github?.data?.projects || []).map((repository) => [
            repository.name.toLowerCase(),
            repository,
        ]),
    );

    const scrollToRenderedIndex = useCallback((renderedIndex, behavior = 'smooth') => {
        const card = cardRefs.current[renderedIndex];
        const track = trackRef.current;
        if (!card || !track) return;
        const cardRect = card.getBoundingClientRect();
        const trackRect = track.getBoundingClientRect();
        const target = track.scrollLeft + (cardRect.left - trackRect.left) - (track.clientWidth * FOCAL - card.clientWidth / 2);
        track.scrollTo({ left: target, behavior });
    }, []);

    const updateTilt = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        const trackRect = track.getBoundingClientRect();
        const centerX = trackRect.left + trackRect.width * FOCAL;
        let closestIndex = activeRenderedIndexRef.current;
        let closestDist = Infinity;

        cardRefs.current.forEach((card, i) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const dist = cardCenter - centerX;
            const normalized = Math.max(-1, Math.min(1, dist / (trackRect.width / 2)));
            const rotateY = normalized * -26;
            const scale = 1 - Math.min(Math.abs(normalized), 1) * 0.16;
            const opacity = 1 - Math.min(Math.abs(normalized), 1) * 0.6;
            card.style.transform = `perspective(1400px) rotateY(${rotateY}deg) scale(${scale})`;
            card.style.opacity = String(opacity);
            card.style.zIndex = String(400 - Math.min(400, Math.round(Math.abs(dist))));

            if (Math.abs(dist) < closestDist) {
                closestDist = Math.abs(dist);
                closestIndex = i;
            }
        });

        activeRenderedIndexRef.current = closestIndex;
        setActiveIndex(((closestIndex % N) + N) % N);
    }, []);

    // After scrolling settles, silently snap back into the middle ("home")
    // copy if the user has drifted into a cloned copy — imperceptible since
    // clones are visually identical to the home cards.
    const scheduleSettleCheck = useCallback(() => {
        clearTimeout(settleTimerRef.current);
        settleTimerRef.current = setTimeout(() => {
            const idx = activeRenderedIndexRef.current;
            if (idx < N) {
                activeRenderedIndexRef.current = idx + N;
                scrollToRenderedIndex(idx + N, 'auto');
            } else if (idx >= 2 * N) {
                activeRenderedIndexRef.current = idx - N;
                scrollToRenderedIndex(idx - N, 'auto');
            }
        }, 150);
    }, [scrollToRenderedIndex]);

    useEffect(() => {
        // Land on the first card of the home copy, centered, with no animation.
        scrollToRenderedIndex(N, 'auto');
        updateTilt();
        const track = trackRef.current;
        if (!track) return undefined;
        let throttled = false;
        let pendingTimer;
        const onScroll = () => {
            if (!throttled) {
                throttled = true;
                updateTilt();
                pendingTimer = setTimeout(() => { throttled = false; }, 32);
            }
            scheduleSettleCheck();
        };
        track.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            track.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            clearTimeout(pendingTimer);
            clearTimeout(settleTimerRef.current);
        };
    }, [updateTilt, scrollToRenderedIndex, scheduleSettleCheck]);

    // Button clicks know exactly which card they're headed to, so update the
    // active index optimistically instead of waiting on a scroll event —
    // keeps the counter/UI correct even if the browser is slow (or, during
    // an animated scroll, hasn't fired an intermediate scroll event yet).
    const goTo = (nextRenderedIndex) => {
        activeRenderedIndexRef.current = nextRenderedIndex;
        setActiveIndex(((nextRenderedIndex % N) + N) % N);
        scrollToRenderedIndex(nextRenderedIndex, 'smooth');
        scheduleSettleCheck();
    };
    const goPrev = () => goTo(activeRenderedIndexRef.current - 1);
    const goNext = () => goTo(activeRenderedIndexRef.current + 1);

    const handleWheel = (e) => {
        const track = trackRef.current;
        if (!track) return;
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            track.scrollLeft += e.deltaY;
        }
    };

    return (
        <div className={styles.projectSection} id="projects">
            <div className={styles.projHeader}>
                <h1>Projects</h1>
                <h6>See some of my recent work</h6>
            </div>

            <div className={styles.galleryControls}>
                <button
                    type="button"
                    className={styles.navArrow}
                    onClick={goPrev}
                    aria-label="Previous project"
                >
                    ‹
                </button>
                <span className={styles.galleryCounter}>
                    {String(activeIndex + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                </span>
                <button
                    type="button"
                    className={styles.navArrow}
                    onClick={goNext}
                    aria-label="Next project"
                >
                    ›
                </button>
            </div>

            <div className={styles.galleryTrack} ref={trackRef} onWheel={handleWheel}>
                {LOOPED.map((project, i) => (
                    <Link
                        key={`${project.slug}-${i}`}
                        href={`/projects/${project.slug}`}
                        className={styles.projCard}
                        ref={(el) => { cardRefs.current[i] = el; }}
                    >
                        <span className={`${styles.statusBadge} ${STATUS_CLASS[project.status] || ''}`}>
                            {project.statusLabel}
                        </span>
                        <div className={styles.projImg}>
                            <Image
                                src={project.image}
                                alt={project.imageAlt}
                                className={project.imageClassName ? styles[project.imageClassName] : undefined}
                                style={{ height: 'auto', width: '100%' }}
                            />
                        </div>
                        <div className={styles.projDescription}>
                            <h6>{project.category}</h6>
                            <h1 className={styles.projTitle}>{project.title}</h1>
                            {project.metrics && <p className={styles.metrics}>{project.metrics}</p>}
                            <p className={styles.cardDescription}>{project.description}</p>
                            <div className={styles.techRow}>
                                {project.tech.slice(0, 4).map((t) => (
                                    <span key={t} className={styles.techPill}>{t}</span>
                                ))}
                            </div>
                            <GithubStats repository={repositoryByName.get(project.repoKey)} />
                        </div>
                        <span className={styles.viewDetails}>View Details →</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
