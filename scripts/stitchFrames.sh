#!/bin/bash

# Parameters
input_folder="$1"
output_folder="$2"
rows="$3"
cols="$4"

mkdir -p "$output_folder"

# Enable debugging by setting the DEBUG flag to true
DEBUG=true

# Loop through each grid cell
for ((row=0; row<rows; row++)); do
  for ((col=0; col<cols; col++)); do
    # List frames for the current cell, sorted to ensure correct order
    frames=$(ls "$input_folder"/*_r${row}_c${col}.png 2>/dev/null | sort -V)
    
    if [ "$DEBUG" = true ]; then
      echo "Processing cell [row=$row, col=$col]..."
      echo "Frames found: $frames"
    fi

    # Only process if frames exist
    if [ -n "$frames" ]; then
      # Create GIF using frames
      output_gif="$output_folder/cell_r${row}_c${col}.gif"
      
      if [ "$DEBUG" = true ]; then
        echo "Creating GIF: $output_gif"
      fi
      echo 'convert $frames -loop 0 "$output_gif"'
      convert $frames -loop 0 "$output_gif"
      
      # Check if the GIF was created successfully
      if [ $? -eq 0 ]; then
        echo "Successfully created GIF: $output_gif"
      else
        echo "Failed to create GIF: $output_gif"
      fi
      
      # Debugging: Check the output GIF file
      if [ "$DEBUG" = true ]; then
        if [ -f "$output_gif" ]; then
          echo "Output GIF exists: $output_gif"
          file "$output_gif"
        else
          echo "Output GIF does not exist: $output_gif"
        fi
      fi
    else
      echo "No frames found for cell [row=$row, col=$col]"
    fi
  done
done
