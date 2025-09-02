#!/bin/bash
# Script to update cache busting timestamps before deployment

# Generate new timestamp
NEW_TIMESTAMP=$(date +%s)
echo "Updating cache busting timestamp to: $NEW_TIMESTAMP"

# Find current timestamp in index.html
CURRENT_TIMESTAMP=$(grep -o '?v=[0-9]*' src/index.html | head -1 | sed 's/?v=//')
echo "Current timestamp: $CURRENT_TIMESTAMP"

# Replace all occurrences
sed -i "s/?v=$CURRENT_TIMESTAMP/?v=$NEW_TIMESTAMP/g" src/index.html

echo "Cache busting timestamp updated successfully!"
echo "You can now deploy with: vercel --prod"