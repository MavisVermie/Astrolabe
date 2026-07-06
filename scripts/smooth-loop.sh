#!/bin/sh
# Smooth + seamless-loop post-process for hero videos.
#   usage: sh scripts/smooth-loop.sh input.mp4 output.mp4
# 1) Motion-compensated interpolation to 60fps (removes 24/30fps judder)
# 2) Crossfades the first second over the tail so the loop point is invisible
set -e
IN="$1"
OUT="$2"

DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
# body = 1s..end, head = 0..1s, xfade offset = (DUR - 1) - 1
OFFSET=$(awk "BEGIN { printf \"%.2f\", $DUR - 2 }")

ffmpeg -y -v error -i "$IN" -filter_complex "\
[0:v]minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1[sm];\
[sm]split[a][b];\
[a]trim=start=1,setpts=PTS-STARTPTS,fps=60,settb=AVTB[body];\
[b]trim=end=1,setpts=PTS-STARTPTS,fps=60,settb=AVTB[head];\
[body][head]xfade=transition=fade:duration=1:offset=$OFFSET[v]" \
  -map "[v]" -an -c:v libx264 -crf 19 -preset slow -pix_fmt yuv420p \
  -movflags +faststart "$OUT"

echo "Smoothed loop written to $OUT"
