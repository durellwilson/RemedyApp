import React from 'react';

const MarqueeText = ({
  text = "HerbaList 🌿",
  size = 212,           // Container (and viewBox) size
  duration = "20s",     // Rotation period; one full 360° rotation per duration
  fontSize = "24",      // Font size for the text
  fill = "#666",        // Text color
  margin = 20,          // How far the circular path is inset (positive) or outset (negative)
  repeats = 4,         // Number of times to repeat the text.
  style = {
    top: 6,
    left: 16,
  }            // Additional styles (optional)
}) => {
  // Calculate the center and radius from the given size and margin.
  const center = size / 2;
  const radius = center - margin;

  // Build a dynamic circle path for the text.
  const dValue = `M ${center},${center} 
                  m -${radius},0 
                  a ${radius},${radius} 0 1,1 ${radius * 2},0 
                  a ${radius},${radius} 0 1,1 -${radius * 2},0`;

  // Repeat the text multiple times with spacing so that it fully covers the circle.
  const repeatedText = Array(repeats).fill(text.trim()).join('   ');

  return (
    <div 
      className="marquee-wrapper"
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: size,
        height: size,
        pointerEvents: 'none', // Allow clicks to pass through
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path id="circlePath" d={dValue} />
        </defs>
        <g>
          {/* Rotate the entire text group continuously */}
          <animateTransform 
            attributeName="transform" 
            type="rotate" 
            from={`${0} ${center} ${center}`} 
            to={`${360} ${center} ${center}`} 
            dur={duration} 
            repeatCount="indefinite"
          />
          <text fontSize={fontSize} fill={fill}>
            <textPath xlinkHref="#circlePath">
              {repeatedText}
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default MarqueeText;