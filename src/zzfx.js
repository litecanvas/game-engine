// ZzFXMicro - Zuper Zmall Zound Zynth - v1.3.0 by Frank Force | https://github.com/KilledByAPixel/ZzFX
/**
 * @param {Window} global
 * @returns {Function} the `zzfx()` function
 */
export const setupZzFX = (global) => {
    global.zzfxX = new AudioContext()
    global.zzfxV = 1 // volume rate

    return (
        i = 1, // volume
        d = 0.05, // randomness
        z = 220, // frequency
        e = 0, // attack
        P = 0, // sustain
        S = 0.1, // release
        I = 0, // shape
        c = 1, // shape curve
        T = 0, // slide
        H = 0, // delta slide
        V = 0, // pitch jump
        J = 0, // pitch jump time
        h = 0, // repeat time
        j = 0, // noise
        K = 0, // modulation
        E = 0, // bit crush
        r = 0, // delay
        B = 1, // sustain volume
        X = 0, // decay
        L = 0, // tremolo
        D = 0 // filter
    ) => {
        let n = Math,
            t = 2 * n.PI,
            a = 44100,
            F = (T *= (500 * t) / a / a),
            O = (z *= ((1 - d + 2 * d * n.random((d = []))) * t) / a),
            x = 0,
            _ = 0,
            f = 0,
            g = 1,
            $ = 0,
            l = 0,
            o = 0,
            s = D < 0 ? -1 : 1,
            u = (t * s * D * 2) / a,
            G = n.cos(u),
            C = n.sin,
            Q = C(u) / 4,
            M = 1 + Q,
            m = (-2 * G) / M,
            y = (1 - Q) / M,
            R = (1 + s * G) / 2 / M,
            A = -(s + G) / M,
            v = R,
            U = 0,
            W = 0,
            Y = 0,
            Z = 0
        for (
            e = a * e + 9,
                X *= a,
                P *= a,
                S *= a,
                r *= a,
                H *= (500 * t) / a ** 3,
                K *= t / a,
                V *= t / a,
                J *= a,
                h = (a * h) | 0,
                i *= 0.3 * zzfxV,
                s = (e + X + P + S + r) | 0;
            f < s;
            d[f++] = o * i
        )
            (++l % ((100 * E) | 0) ||
                ((o = I
                    ? 1 < I
                        ? 2 < I
                            ? 3 < I
                                ? C(x * x)
                                : n.max(n.min(n.tan(x), 1), -1)
                            : 1 - (((((2 * x) / t) % 2) + 2) % 2)
                        : 1 - 4 * n.abs(n.round(x / t) - x / t)
                    : C(x)),
                (o =
                    (h ? 1 - L + L * C((t * f) / h) : 1) *
                    (o < 0 ? -1 : 1) *
                    n.abs(o) ** c *
                    (f < e
                        ? f / e
                        : f < e + X
                          ? 1 - ((f - e) / X) * (1 - B)
                          : f < e + X + P
                            ? B
                            : f < s - r
                              ? ((s - f - r) / S) * B
                              : 0)),
                (o = r
                    ? o / 2 + (r > f ? 0 : ((f < s - r ? 1 : (s - f) / r) * d[(f - r) | 0]) / 2 / i)
                    : o),
                D && (o = Z = v * U + A * (U = W) + R * (W = o) - y * Y - m * (Y = Z))),
                (u = (z += T += H) * n.cos(K * _++)),
                (x += u + u * j * C(f ** 5)),
                g && ++g > J && ((z += V), (O += V), (g = 0)),
                !h || ++$ % h || ((z = O), (T = F), (g = g || 1)))
        ;((i = zzfxX.createBuffer(1, s, a)),
            i.getChannelData(0).set(d),
            (z = zzfxX.createBufferSource()),
            (z.buffer = i),
            z.connect(zzfxX.destination),
            z.start())
    }
}
