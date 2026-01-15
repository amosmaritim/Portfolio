# GitHub Setup Instructions

## Prerequisites
1. Install Git: https://git-scm.com/download/win
2. Create a GitHub account if you don't have one: https://github.com

## Option 1: Using the PowerShell Script

1. Open PowerShell in the project directory
2. Run: `.\setup-github.ps1`

## Option 2: Manual Setup

### Step 1: Initialize Git Repository
```powershell
git init
git add .
git commit -m "Initial commit: Portfolio website with React and Tailwind CSS"
```

### Step 2: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `Portfolio`
3. Choose Public or Private
4. **DO NOT** check "Initialize this repository with a README"
5. Click "Create repository"

### Step 3: Connect and Push
```powershell
git remote add origin https://github.com/YOUR_USERNAME/Portfolio.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## If you get authentication errors:
- Use a Personal Access Token instead of password
- Create one at: https://github.com/settings/tokens
- Use the token as your password when prompted
