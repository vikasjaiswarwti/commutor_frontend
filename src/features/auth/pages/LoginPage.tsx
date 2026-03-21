// src/features/auth/pages/LoginPage.tsx
// Pixel-perfect match to Main__1_.png design:
//   • White full-page background
//   • Logo + "WE GO THE DISTANCE" tagline — top left
//   • Form left column — left-aligned, NOT centered
//   • Car image right column — rounded card, NOT full bleed
//   • "Don't you have an account? Sign Up" — bottom center
//   • No social buttons (not in the target design)
//   • Pure inline styles — zero Tailwind/AntD conflicts
//
// export default required for React.lazy() to work

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../../../shared/constants/app.constants';

import CommutrLogoSrc from '../../../assets/Commutor-Logo.png';
import CarHeroImage from '../../../assets/carimage.png';

const FALLBACK = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80';

/* ── Design tokens (match screenshot exactly) ──────────────────────── */
const T = {
    green: '#00A86B',
    greenHover: '#009260',
    greenLight: '#EBF7F2',     // input bg tint
    grayText: '#6B7280',
    grayLabel: '#374151',
    grayPlaceholder: '#9CA3AF',
    border: '#D1D5DB',
    borderFocus: '#00A86B',
    errorBg: '#FEF2F2',
    errorBorder: '#FCA5A5',
    errorText: '#DC2626',
    white: '#FFFFFF',
    pageBg: '#FFFFFF',
};

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const { handleLogin, isLoading, error } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try { await handleLogin({ email, password }); }
        catch { /* error stored in Redux */ }
    };

    return (
        <div style={s.page}>
            {/* ── Outer wrapper — constrains max-width and centers on very wide screens ── */}
            <div style={s.wrapper}>

                {/* ── Logo area — top left ──────────────────────────────────── */}
                <div style={s.logoArea}>
                    <img src={CommutrLogoSrc} alt="COMMUTR" style={s.logoImg} />
                    <span style={s.tagline}>WE GO THE DISTANCE</span>
                </div>

                {/* ── Two-column body ───────────────────────────────────────── */}
                <div style={s.body}>

                    {/* LEFT: form */}
                    <div style={s.formCol}>
                        <h1 style={s.heading}>Log in to your account.</h1>
                        <p style={s.subheading}>
                            Enter your email address and password to log in.
                        </p>

                        <form onSubmit={handleSubmit} style={s.form}>
                            {/* Email */}
                            <div style={s.fieldWrap}>
                                <label style={s.label}>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    required
                                    style={{
                                        ...s.input,
                                        borderColor: emailFocus ? T.borderFocus : T.border,
                                        boxShadow: emailFocus ? `0 0 0 3px ${T.green}22` : 'none',
                                    }}
                                />
                            </div>

                            {/* Password */}
                            <div style={s.fieldWrap}>
                                <label style={s.label}>Password</label>
                                <div style={s.passWrap}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onFocus={() => setPassFocus(true)}
                                        onBlur={() => setPassFocus(false)}
                                        required
                                        style={{
                                            ...s.input,
                                            paddingRight: 48,
                                            borderColor: passFocus ? T.borderFocus : T.border,
                                            boxShadow: passFocus ? `0 0 0 3px ${T.green}22` : 'none',
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(p => !p)}
                                        style={s.eyeBtn}
                                        tabIndex={-1}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                                    </button>
                                </div>
                                <div style={s.forgotRow}>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/forgot-password')}
                                        style={s.forgotBtn}
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div style={s.errorBox}>
                                    <p style={s.errorText}>
                                        {typeof error === 'string' ? error : 'Invalid credentials. Please try again.'}
                                    </p>
                                </div>
                            )}

                            {/* Sign In */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{
                                    ...s.submitBtn,
                                    opacity: isLoading ? 0.75 : 1,
                                    cursor: isLoading ? 'wait' : 'pointer',
                                }}
                            >
                                {isLoading ? (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                                        <Spinner /> Signing in…
                                    </span>
                                ) : 'Sign In'}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT: car image — rounded card, NOT full bleed */}
                    <div style={s.imageCol}>
                        <div style={s.imageCard}>
                            <img
                                src={CarHeroImage}
                                alt="COMMUTR — Your Everyday Commute Partner"
                                style={s.carImg}
                                onError={e => { (e.target as HTMLImageElement).src = FALLBACK; }}
                            />
                            {/* Green overlay — matching the teal wash in the design */}

                        </div>
                    </div>
                </div>

                {/* ── Footer — bottom center ────────────────────────────────── */}
                <div style={s.footer}>
                    <p style={s.footerText}>
                        Don't you have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate(ROUTES.LOGIN === '/login' ? '/signup' : '/signup')}
                            style={s.signUpBtn}
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

/* ── Styles object — raw CSS, zero framework deps ───────────────────── */
const s: Record<string, React.CSSProperties> = {
    page: {
        minHeight: '100vh',
        background: T.pageBg,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    wrapper: {
        maxWidth: 1440,
        width: '100%',
        margin: '0 auto',
        padding: '36px 60px 40px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        boxSizing: 'border-box',
    },

    /* Logo */
    logoArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 48,
    },
    logoImg: {
        height: 36,
        width: 'auto',
        objectFit: 'contain',
    },
    tagline: {
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.14em',
        color: T.grayText,
        marginTop: 4,
        textTransform: 'uppercase',
    },

    /* Two-column body */
    body: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 80,
    },

    /* LEFT column */
    formCol: {
        flex: '0 0 420px',
        maxWidth: 420,
    },
    heading: {
        fontSize: 28,
        fontWeight: 700,
        color: '#111827',
        margin: '0 0 8px',
        lineHeight: 1.25,
        letterSpacing: '-0.01em',
    },
    subheading: {
        fontSize: 14,
        color: T.grayText,
        margin: '0 0 32px',
        lineHeight: 1.5,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },
    fieldWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
    },
    label: {
        fontSize: 13,
        fontWeight: 600,
        color: T.grayLabel,
        letterSpacing: '0.005em',
    },
    input: {
        width: '100%',
        height: 44,
        padding: '0 16px',
        fontSize: 14,
        color: '#111827',
        background: T.greenLight,
        border: `1.5px solid ${T.border}`,
        borderRadius: 10,
        outline: 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
    } as React.CSSProperties,
    passWrap: {
        position: 'relative',
    },
    eyeBtn: {
        position: 'absolute',
        right: 14,
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        color: T.grayPlaceholder,
        display: 'flex',
        alignItems: 'center',
    },
    forgotRow: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 6,
    },
    forgotBtn: {
        background: 'none',
        border: 'none',
        padding: 0,
        fontSize: 13,
        fontWeight: 600,
        color: T.green,
        cursor: 'pointer',
        fontFamily: 'inherit',
    },
    errorBox: {
        background: T.errorBg,
        border: `1px solid ${T.errorBorder}`,
        borderRadius: 8,
        padding: '10px 14px',
    },
    errorText: {
        margin: 0,
        fontSize: 13,
        color: T.errorText,
    },
    submitBtn: {
        width: '100%',
        height: 46,
        background: T.green,
        color: T.white,
        border: 'none',
        borderRadius: 10,
        fontSize: 15,
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'background 0.15s',
        letterSpacing: '0.01em',
    },

    /* RIGHT column — image as rounded card */
    imageCol: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    imageCard: {
        position: 'relative',
        width: '100%',
        maxWidth: 680,
        aspectRatio: '680 / 480',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
    },
    carImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    // Green tint overlay — matches the design's teal wash
    imageOverlay: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(0,168,107,0.55) 0%, rgba(0,168,107,0.20) 50%, transparent 100%)',
    },
    imageTextWrap: {
        position: 'absolute',
        top: 32,
        left: 32,
        right: '30%',
    },
    imageHeading: {
        margin: 0,
        fontSize: 36,
        fontWeight: 800,
        color: T.white,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        textShadow: '0 2px 12px rgba(0,0,0,0.15)',
    },

    /* Footer */
    footer: {
        paddingTop: 32,
        display: 'flex',
        justifyContent: 'center',
    },
    footerText: {
        margin: 0,
        fontSize: 14,
        color: T.grayText,
    },
    signUpBtn: {
        background: 'none',
        border: 'none',
        padding: 0,
        fontSize: 14,
        fontWeight: 600,
        color: T.green,
        cursor: 'pointer',
        fontFamily: 'inherit',
    },
};

/* ── Inline SVG icons — no icon lib dependency ───────────────────── */
const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

const Spinner = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
        <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
);