# Videos

`about-techcadd.mp4` — the campus loop behind the About section.

The section renders it with `autoPlay muted loop playsInline` and no controls,
so it starts on load and runs forever without interaction. Until the file is
present the media element errors and `About.tsx` falls back to a cross-fading
set of campus stills, which is what renders today.

Encode for the web: H.264 (yuv420p) in MP4, `-movflags +faststart` so the first
frame is decodable before the whole file arrives, no audio track, and a few MB
at most — it is a background loop, not a feature film.

    ffmpeg -i source.mov -an -vcodec libx264 -pix_fmt yuv420p -crf 26 \
           -movflags +faststart public/videos/about-techcadd.mp4
