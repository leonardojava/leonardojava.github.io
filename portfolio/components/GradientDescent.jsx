import { useState, useEffect, useRef } from 'react';

export default function GradientDescent(){
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const[isPlaying, setPlay] = useState(false)
  
  useEffect(() => {
    const updateDimensions = () => {
      if(isPlaying) return;
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', updateDimensions);
    setPlay(false)
    updateDimensions();
    setPlay(true)
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Function parameters
    const numStartPoints = 2;
    let points = [];
    let learningRate = 0.001;
    
    
    const f = (x) => Math.pow(x, 3) + 2 * Math.pow(x, 2) + 4;
    
    // Derivative: f'(x) = 3x^2 + 4x
    const fPrime = (x) => 3 * Math.pow(x, 2) + 4 * x;
    
    //ryoki tenkai domain
    const minX = -4;
    const maxX = 2;
    

    let minY = Infinity;
    let maxY = -Infinity;
    
    for (let x = minX; x <= maxX; x += 0.1) {
      const y = f(x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
    
    
    const paddingY = (maxY - minY) * 0.1;
    minY -= paddingY;
    maxY += paddingY;
    
    // Initialize starting points along the x-axis
    for (let i = 0; i < numStartPoints; i++) {
      const x = minX + (i / (numStartPoints - 1)) * (maxX - minX);
      points.push({
        x: x,
        y: f(x),
        history: []
      });
    }
    
    // Transform from function coordinate space to canvas space
    const transformX = (x) => {
      return ((x - minX) / (maxX - minX)) * dimensions.width;
    };
    
    const transformY = (y) => {
      
      return dimensions.height - ((y - minY) / (maxY - minY)) * dimensions.height;
    };
    
    
    let frameId;
    let frameCount = 0;
    const maxFrames = 1000000; 
    
    const render = () => {
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(20, 30, 48, 1)');
      gradient.addColorStop(1, 'rgba(36, 59, 85, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      
      
      const yAxisPos = transformY(0);
      if (yAxisPos >= 0 && yAxisPos <= dimensions.height) {
        ctx.moveTo(0, yAxisPos);
        ctx.lineTo(dimensions.width, yAxisPos);
      }
      
      
      const xAxisPos = transformX(0);
      if (xAxisPos >= 0 && xAxisPos <= dimensions.width) {
        ctx.moveTo(xAxisPos, 0);
        ctx.lineTo(xAxisPos, dimensions.height);
      }
      
      ctx.stroke();
      
      // Draw function curve
      ctx.beginPath();
      ctx.moveTo(transformX(minX), transformY(f(minX)));
      
      const numPoints = 200;
      for (let i = 1; i <= numPoints; i++) {
        const x = minX + (i / numPoints) * (maxX - minX);
        ctx.lineTo(transformX(x), transformY(f(x)));
      }
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      
      
      
      // Update and draw each point
      points.forEach((point, idx) => {
        // Store history
        if (frameCount % 3 === 0) {
          point.history.push({x: point.x, y: point.y});
          // Keep history limited
          if (point.history.length > 50) {
            point.history.shift();
          }
        }
        
        // Draw history trail
        if (point.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(transformX(point.history[0].x), transformY(point.history[0].y));
          
          for (let i = 1; i < point.history.length; i++) {
            ctx.lineTo(transformX(point.history[i].x), transformY(point.history[i].y));
          }
          
          const alpha = 0.3 + (0.5 * idx / points.length);
          ctx.strokeStyle = `rgba(65, 184, 255, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        // Apply gradient descent
        // Calculate gradient at current point
        const gradient = fPrime(point.x);
        
        // Update position using gradient descent
        point.x = point.x - learningRate * gradient;
        point.y = f(point.x);  // Update y based on new x
        
        // Draw the current point
        ctx.beginPath();
        ctx.arc(transformX(point.x), transformY(point.y), 7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(65, 184, 255, 0.8)';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw tangent line at current point
        const tangentLength = 1;  // Length of tangent line in x-units
        const x1 = point.x - tangentLength/2;
        const y1 = point.y - gradient * tangentLength/2;
        const x2 = point.x + tangentLength/2;
        const y2 = point.y + gradient * tangentLength/2;
        
        ctx.beginPath();
        ctx.moveTo(transformX(x1), transformY(y1));
        ctx.lineTo(transformX(x2), transformY(y2));
        ctx.strokeStyle = 'rgba(255, 150, 150, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Draw gradient vector
        const vectorScale = 0.2;  // Scale the gradient vector for visibility
        ctx.beginPath();
        ctx.moveTo(transformX(point.x), transformY(point.y));
        ctx.lineTo(transformX(point.x - gradient * vectorScale), transformY(point.y));
        ctx.strokeStyle = 'rgba(255, 220, 100, 0.8)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Add arrowhead to gradient vector
        const arrowSize = 8;
        const angle = gradient > 0 ? Math.PI : 0;  // Direction based on gradient sign
        const arrowX = transformX(point.x - gradient * vectorScale);
        const arrowY = transformY(point.y);
        
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX + arrowSize * Math.cos(angle - Math.PI/6), arrowY + arrowSize * Math.sin(angle - Math.PI/6));
        ctx.lineTo(arrowX + arrowSize * Math.cos(angle + Math.PI/6), arrowY + arrowSize * Math.sin(angle + Math.PI/6));
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 220, 100, 0.8)';
        ctx.fill();
      });
      
      // Gradually reduce learning rate
      if (frameCount % 50 === 0) {
        learningRate *= 0.95;
        if (learningRate < 0.0005) {
          learningRate = 0.0005;
        }
      }
      
      frameCount++;
      
      
      if (frameCount < maxFrames) {
        frameId = requestAnimationFrame(render);
      }
    };
    
    frameId = requestAnimationFrame(render);
    
    // Reset animation periodically to show the whole process again
    const resetInterval = setInterval(() => {
      // Reset points
      points = [];
      for (let i = 0; i < numStartPoints; i++) {
        const x = minX + (i / (numStartPoints - 1)) * (maxX - minX);
        points.push({
          x: x,
          y: f(x),
          history: []
        });
      }
      
      // Reset learning rate
      learningRate = 0.01;
      frameCount = 0;
    }, 15000);  // Reset every 15 seconds
    
    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(resetInterval);
    };
  }, [dimensions]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
}
