#!/usr/bin/env npx tsx
/**
 * LinkedIn Carousel PDF Generator - Core Teaser
 * Generates single 9-slide PDF for AI Services campaign
 *
 * Usage: npx tsx linkedin-carousel/generate.ts
 */
import puppeteer from 'puppeteer'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = join(__dirname, 'output')
const OUTPUT_FILE = join(OUTPUT_DIR, 'ai-services-teaser.pdf')

// Generate HTML for 8-slide carousel
function generateHTML(): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    :root {
      --black: #000000;
      --white: #FFFFFF;
      --yellow: #FFE500;
      --gray: #F5F5F5;
      --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      --font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { size: 1080px 1350px; margin: 0; }
    body { font-family: var(--font-sans); background: var(--white); }

    .slide {
      width: 1080px;
      height: 1350px;
      padding: 40px;
      display: flex;
      flex-direction: column;
      page-break-after: always;
      background: var(--white);
      color: var(--black);
      position: relative;
      overflow: hidden;
    }
    .slide:last-child { page-break-after: avoid; }

    /* Top bar accent */
    .slide::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      background: var(--yellow);
    }

    .badge {
      font-family: var(--font-mono);
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--white);
      background: var(--black);
      padding: 14px 28px;
      display: inline-block;
      margin-top: 20px;
      margin-bottom: 24px;
      align-self: flex-start;
      border: 3px solid var(--black);
    }

    /* Content containers */
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 24px;
    }

    /* Typography */
    .headline {
      font-size: 80px;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -2px;
    }

    .subline {
      font-size: 36px;
      font-weight: 600;
      line-height: 1.4;
      color: var(--black);
      opacity: 0.85;
    }

    .body-text {
      font-size: 32px;
      font-weight: 600;
      line-height: 1.5;
      max-width: 900px;
    }

    .big-stat {
      font-family: var(--font-mono);
      font-size: 140px;
      font-weight: 800;
      line-height: 1;
      color: var(--black);
      text-align: center;
      background: var(--yellow);
      padding: 20px 40px;
      display: inline-block;
      border: 6px solid var(--black);
    }

    .stat-label {
      font-size: 36px;
      font-weight: 700;
      text-align: center;
      line-height: 1.3;
      max-width: 800px;
      margin: 0 auto;
    }

    /* Highlight styles */
    .highlight-box {
      background: var(--yellow);
      color: var(--black);
      padding: 8px 20px;
      display: inline;
      border: 4px solid var(--black);
      font-weight: 800;
    }

    .highlight-underline {
      border-bottom: 6px solid var(--yellow);
      padding-bottom: 4px;
      display: inline;
    }

    .number-highlight {
      background: var(--yellow);
      color: var(--black);
      padding: 4px 16px;
      display: inline-block;
      border: 4px solid var(--black);
      font-weight: 800;
      font-family: var(--font-mono);
    }

    /* List styles */
    .bullet-list {
      font-size: 32px;
      font-weight: 600;
      line-height: 1.6;
      list-style: none;
      padding: 0;
    }

    .bullet-list li {
      padding-left: 50px;
      position: relative;
      margin-bottom: 16px;
    }

    .bullet-list li::before {
      content: '■';
      position: absolute;
      left: 0;
      font-size: 24px;
      color: var(--black);
      line-height: 1.4;
    }

    /* Footer */
    .footer {
      font-family: var(--font-mono);
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #888;
      text-align: center;
      padding-top: 24px;
      margin-top: auto;
    }

    .footer-highlight {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      color: var(--black);
    }

    .footer-highlight::before,
    .footer-highlight::after {
      content: '';
      width: 60px;
      height: 4px;
      background: var(--black);
    }

    /* Small text */
    .small-text {
      font-size: 24px;
      font-weight: 600;
      color: var(--black);
      opacity: 0.7;
      margin-top: 16px;
    }

    /* CTA */
    .cta-box {
      background: var(--white);
      border: 6px solid var(--black);
      padding: 60px;
      text-align: center;
    }

    .cta-headline {
      font-size: 56px;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 32px;
      letter-spacing: -1px;
    }

    .cta-text {
      font-size: 36px;
      font-weight: 700;
      line-height: 1.4;
      margin-bottom: 16px;
    }

    .cta-subtext {
      font-size: 24px;
      font-weight: 600;
      opacity: 0.7;
      margin-top: 24px;
    }

    .logo-small {
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #888;
      margin-top: 24px;
    }

    /* Profile photo section */
    .profile-section {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 16px;
    }

    .profile-photo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 5px solid var(--yellow);
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      color: #666;
    }

    .profile-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .profile-name {
      font-size: 28px;
      font-weight: 800;
      color: var(--black);
    }

    .profile-title {
      font-size: 18px;
      font-weight: 600;
      color: #666;
    }

    .follower-badge {
      display: inline-block;
      background: var(--yellow);
      color: var(--black);
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 700;
      font-family: var(--font-mono);
    }

    /* Navigation arrows */
    .arrow-next {
      position: absolute;
      bottom: 60px;
      right: 60px;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      opacity: 0.4;
      transform: rotate(-45deg);
    }

    /* Industry Rankings */
    .ranking-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .ranking-item {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .ranking-number {
      font-family: var(--font-mono);
      font-size: 28px;
      font-weight: 800;
      color: var(--black);
      min-width: 60px;
    }

    .ranking-name {
      font-size: 24px;
      font-weight: 600;
      color: var(--black);
      min-width: 340px;
    }

    .ranking-bar-container {
      flex: 1;
      position: relative;
      height: 36px;
      background: var(--gray);
      border: 3px solid var(--black);
    }

    .ranking-bar {
      height: 100%;
      background: var(--black);
      position: relative;
    }

    .ranking-bar.top {
      background: var(--yellow);
    }

    .ranking-score {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-family: var(--font-mono);
      font-size: 20px;
      font-weight: 800;
      color: var(--black);
    }

    /* Dark CTA Slide */
    .slide.dark {
      background: var(--black);
    }

    .slide.dark .badge {
      background: var(--yellow);
      color: var(--black);
    }

    .slide.dark .headline,
    .slide.dark .body-text,
    .slide.dark .small-text {
      color: var(--white);
    }

    .repost-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
      margin-top: 40px;
    }

    .repost-profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .repost-photo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 4px solid var(--yellow);
      background: var(--gray);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
    }

    .repost-info {
      text-align: center;
    }

    .repost-name {
      font-size: 28px;
      font-weight: 800;
      color: var(--white);
      margin-bottom: 8px;
    }

    .repost-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--gray);
    }

    .repost-button {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 20px 48px;
      background: var(--yellow);
      color: var(--black);
      font-size: 24px;
      font-weight: 800;
      border: 4px solid var(--yellow);
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
    }

    .repost-button:hover {
      background: var(--black);
      color: var(--yellow);
    }

    .repost-icon {
      font-size: 28px;
    }
  </style>
</head>
<body>
  <!-- Slide 1: Hook Cover -->
  <div class="slide">
    <div class="badge">AI Maturity Index 2025</div>
    <div class="content" style="align-items: center;">
      <div class="headline" style="text-align: center;">
        Is AI <span class="highlight-box">Killing</span><br>
        or <span class="highlight-box">Empowering</span><br>
        <span class="highlight-underline">Services Professionals?</span>
      </div>
      <div class="subline" style="margin-top: 48px; text-align: center;">
        I joined 1,700+ professionals across 45+ industries to find out.
      </div>
      <div class="profile-section" style="margin-top: 60px;">
        <div class="profile-photo" style="width: 160px; height: 160px; font-size: 64px;">👤</div>
        <div class="profile-info">
          <div class="profile-name">[Your Name]</div>
          <div class="profile-title">[Your Title] @ [Your Firm]</div>
        </div>
      </div>
    </div>
    <div class="arrow-next">↗</div>
  </div>

  <!-- Slide 2: The Divide -->
  <div class="slide">
    <div class="badge">The Reality</div>
    <div class="content">
      <div class="headline" style="text-align: center; font-size: 84px; margin-bottom: 80px;">
        Same tools.<br>
        <span class="highlight-box">Different outcomes.</span>
      </div>
      <div class="body-text" style="text-align: center; font-size: 32px; line-height: 2;">
        <span class="number-highlight">20%</span> are thriving with AI.<br><br>
        <span class="number-highlight">59%</span> are struggling.
      </div>
      <div class="body-text" style="text-align: center; margin-top: 60px; font-size: 28px; opacity: 0.8;">
        The gap grows every single day.
      </div>
    </div>
    <div class="arrow-next">↗</div>
  </div>

  <!-- Slide 5: Mental Health Punch -->
  <div class="slide">
    <div class="badge">Well-Being Crisis</div>
    <div class="content" style="align-items: center;">
      <div class="big-stat">28%</div>
      <div class="stat-label" style="margin-top: 40px;">
        <strong>Well-Being Gap</strong>
      </div>
      <div class="body-text" style="text-align: center; margin-top: 40px;">
        Top AI performers report 28% higher psychological well-being than the bottom group.
        <br><br>
        For the strugglers, stress levels look like clinical distress.
      </div>
    </div>
    <div class="arrow-next">↗</div>
  </div>

  <!-- Slide 5: Experience Shock -->
  <div class="slide">
    <div class="badge">Experience ≠ Advantage</div>
    <div class="content" style="align-items: center;">
      <div class="headline" style="text-align: center; font-size: 68px;">
        <span class="highlight-box">27 Years</span> of<br>
        Experience =<br>
        ~0 AI Advantage
      </div>
      <div class="body-text" style="text-align: center; margin-top: 60px;">
        <span style="font-size: 32px; font-weight: 700;">In plain English: tenure doesn't protect you.</span>
      </div>
    </div>
    <div class="arrow-next">↗</div>
  </div>

  <!-- Slide 6: What Moves the Needle -->
  <div class="slide">
    <div class="badge">The Lever</div>
    <div class="content" style="align-items: center;">
      <div class="big-stat">+162%</div>
      <div class="stat-label" style="margin-top: 40px;">
        <strong>AI Maturity</strong>
      </div>
      <div class="body-text" style="text-align: center; margin-top: 40px;">
        Professionals who explored <strong>10+ AI use cases</strong> gained 38 points in maturity.
        <br><br>
        That's the <span class="highlight-box">single highest-leverage behavior</span> in the whole dataset.
      </div>
    </div>
    <div class="arrow-next">↗</div>
  </div>

  <!-- Slide 7: What This Means -->
  <div class="slide">
    <div class="badge">What This Means for Us</div>
    <div class="content">
      <div class="headline" style="font-size: 56px; margin-bottom: 40px;">
        For services professionals<br>
        like us, this means:
      </div>
      <ul class="bullet-list">
        <li>AI won't kill "consulting" – it will kill how we work now</li>
        <li>Exploration beats waiting for training</li>
        <li>The gap is becoming a career-defining divide</li>
      </ul>
    </div>
    <div class="arrow-next">↗</div>
  </div>

  <!-- Slide 8: CTA (Dark) -->
  <div class="slide dark">
    <div class="badge">Get Full Access</div>
    <div class="content" style="align-items: center;">
      <div class="headline" style="text-align: center; font-size: 64px; margin-bottom: 40px;">
        Want the<br>
        <span class="highlight-underline">Full Report?</span>
      </div>
      <div class="body-text" style="text-align: center; max-width: 700px; margin-bottom: 60px; font-size: 28px;">
        Comment <strong style="background: var(--yellow); color: var(--black); padding: 8px 20px; border-radius: 8px;">REPORT</strong> below
      </div>
      <div class="small-text" style="text-align: center; font-size: 20px; opacity: 0.7;">
        I'll send you the complete 40-page analysis<br>
        with detailed breakdowns by industry
      </div>
      <div class="small-text" style="text-align: center; font-size: 16px; opacity: 0.5; margin-top: 40px;">
        N = 3,300+ people, 1,700 in services
      </div>
    </div>
  </div>
</body>
</html>`
}

// Main generation
async function main() {
  console.log('\n📊 LinkedIn Carousel Generator - Core Teaser')
  console.log('─'.repeat(50))

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  console.log('\n🚀 Generating 8-slide teaser PDF...\n')

  // Launch browser
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  // Generate HTML and PDF
  const html = generateHTML()
  await page.setContent(html, { waitUntil: 'load', timeout: 10000 })

  await page.pdf({
    path: OUTPUT_FILE,
    width: '1080px',
    height: '1350px',
    printBackground: true,
    pageRanges: '1-9'
  })

  await browser.close()

  console.log('✅ Complete!')
  console.log(`📁 Output: ${OUTPUT_FILE}`)
  console.log('\n📝 Note: Replace [Name], [Title], [Firm] in Slide 1 footer with your details\n')
}

main().catch(console.error)
