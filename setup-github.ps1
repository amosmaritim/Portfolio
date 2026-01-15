# PowerShell script to set up and push to GitHub
# Make sure Git is installed and you're logged in to GitHub

Write-Host "Setting up Git repository..." -ForegroundColor Green

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio website with React and Tailwind CSS"

# Create repository on GitHub (requires GitHub CLI)
# If you don't have GitHub CLI, create the repository manually on GitHub.com first
Write-Host "`nCreating GitHub repository..." -ForegroundColor Yellow
Write-Host "If GitHub CLI is not installed, please:" -ForegroundColor Yellow
Write-Host "1. Go to https://github.com/new" -ForegroundColor Yellow
Write-Host "2. Create a new repository named 'Portfolio'" -ForegroundColor Yellow
Write-Host "3. Do NOT initialize with README, .gitignore, or license" -ForegroundColor Yellow
Write-Host "4. Then run the commands below manually" -ForegroundColor Yellow

# Try to create repo with GitHub CLI
try {
    gh repo create Portfolio --public --source=. --remote=origin --push
    Write-Host "Repository created and pushed successfully!" -ForegroundColor Green
} catch {
    Write-Host "`nGitHub CLI not available. Please follow these steps:" -ForegroundColor Red
    Write-Host "1. Create repository 'Portfolio' on GitHub.com" -ForegroundColor Yellow
    Write-Host "2. Run these commands:" -ForegroundColor Yellow
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/Portfolio.git" -ForegroundColor Cyan
    Write-Host "   git branch -M main" -ForegroundColor Cyan
    Write-Host "   git push -u origin main" -ForegroundColor Cyan
}
