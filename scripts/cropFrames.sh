#!/bin/bash

# Parameters
input_folder="$1"
output_folder="$2"
rows="$3"
cols="$4"

# Ensure required parameters are provided
if [ -z "$input_folder" ] || [ -z "$output_folder" ] || [ -z "$rows" ] || [ -z "$cols" ]; then
  echo "Usage: $0 <input_folder> <output_folder> <rows> <cols>"
  exit 1
fi

# Create output folder if it doesn't exist
mkdir -p "$output_folder"

# Loop through frames in the input folder
for frame in "$input_folder"/frame_*.png; do
  filename=$(basename "$frame")
  width=$(convert "$frame" -format "%w" info:)
  height=$(convert "$frame" -format "%h" info:)
  cell_width=$((width / cols))
  cell_height=$((height / rows))

  # Loop through rows and columns
  for ((row=0; row<rows; row++)); do
    for ((col=0; col<cols; col++)); do
      x_offset=$((col * cell_width))
      y_offset=$((row * cell_height))
      convert "$frame" -crop ${cell_width}x${cell_height}+${x_offset}+${y_offset} +repage "$output_folder/${filename%.*}_r${row}_c${col}.png"
    done
  done
done
