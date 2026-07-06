#!/bin/sh
# Build a looping motion video from AI-generated keyframes (no Sora).
#   usage: sh scripts/keyframes-to-video.sh .assets/ice output.mp4
# Keyframes k1..k6 morph into each other via motion-compensated interpolation;
# the sequence ends back on k1 so the loop is seamless.
set -e
DIR="$1"
OUT="$2"
STEP=1.2   # seconds between keyframes

LIST="$DIR/list.txt"
: > "$LIST"
for k in k1 k2 k3 k4 k5 k6; do
  echo "file '$k.png'" >> "$LIST"
  echo "duration $STEP" >> "$LIST"
done
# close the loop on the first frame (dropped from output tail)
echo "file 'k1.png'" >> "$LIST"
echo "duration 0.04" >> "$LIST"

ffmpeg -y -v error -f concat -safe 0 -i "$LIST" -filter_complex "\
[0:v]scale=1792:1024:force_original_aspect_ratio=increase,crop=1792:1024,fps=10,\
minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,\
trim=end=7.2,setpts=PTS-STARTPTS[v]" \
  -map "[v]" -an -c:v libx264 -crf 19 -preset slow -pix_fmt yuv420p \
  -movflags +faststart "$OUT"

echo "Keyframe morph video written to $OUT"
