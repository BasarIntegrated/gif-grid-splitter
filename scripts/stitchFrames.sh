#!/bin/bash

input_folder="$1"
output_folder="$2"
rows="$3"
cols="$4"

mkdir -p "$output_folder"

for ((row=0; row<rows; row++)); do
  for ((col=0; col<cols; col++)); do
    # List frames for the current cell
    frames=$(ls "$input_folder"/*_r${row}_c${col}.png | sort)

    if [ -n "$frames" ]; then
      convert $frames "$output_folder/cell_r${row}_c${col}.gif"
    fi
  done
done
