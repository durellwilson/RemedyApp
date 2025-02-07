import React from 'react';

const LogoMarquee = ({
  text = "HerbaList 🌿",
  size = 212,               // Base size for the SVG (the viewBox will be 0 0 size size)
  duration = "20s",         // Rotation period for a full circle rotation
  fontSize = "24",          // Font size for the marquee text
  fill = "#666",            // Color of the marquee text
  margin = 20,              // How far the circular text path is inset from the edge
  repeats = 4,              // Number of repetitions of the text along the circle.
  logoUrl = "/herbalist.svg",    // Path to your logo image (should be in public or imported)
  logoWidth = 162,           // Display width of the logo (will adjust positioning automatically)
  logoHeight = 162           // Display height of the logo
}) => {
  // Calculate the center and radius from the given size and margin.
  const center = size / 2;
  const radius = center - margin;

  // Build a dynamic circle path for the text.
  const dPath = `M ${center},${center} 
                 m -${radius},0 
                 a ${radius},${radius} 0 1,1 ${radius * 2},0 
                 a ${radius},${radius} 0 1,1 -${radius * 2},0`;

  // Repeat the text for continuous appearance around the circle.
  const repeatedText = Array(repeats).fill(text.trim()).join('   ');

  return (
    <div style={{ width: '100%', maxWidth: size, margin: '0 auto' }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{ width: '100%', height: 'auto' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path id="circlePath" d={dPath} />
        </defs>
        <g>
          {/* Animate the entire group for continuous rotation */}
          <animateTransform 
            attributeName="transform" 
            type="rotate" 
            from={`0 ${center} ${center}`} 
            to={`360 ${center} ${center}`} 
            dur={duration} 
            repeatCount="indefinite"
          />
          <text fontSize={fontSize} fill={fill}>
            <textPath xlinkHref="#circlePath">
              {repeatedText}
            </textPath>
          </text>
        </g>
        {/* Place the logo in the center */}
        <image 
          href={logoUrl} 
          x={center - logoWidth / 2} 
          y={center - logoHeight / 2} 
          width={logoWidth} 
          height={logoHeight} 
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </div>
  );
};

export default LogoMarquee; 