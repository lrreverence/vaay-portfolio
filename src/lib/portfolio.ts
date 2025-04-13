import fs from 'fs';
import path from 'path';

export function getPortfolioContent() {
  const portfolioPath = path.join(process.cwd(), 'content', 'portfolio.md');
  try {
    const content = fs.readFileSync(portfolioPath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading portfolio file:', error);
    return '';
  }
} 