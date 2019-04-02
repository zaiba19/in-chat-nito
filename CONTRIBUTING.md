# GIT WORKFLOW

__...On github make a fork of this repo...__

git clone https://github.com/YOURUSERNAME/in-chat-nito.git          
git remote add upstream https://github.com/in-chat-nito/in-chat-nito.git     
   
`origin` should be tracking your fork.
`upstream` should be tracking original repository. 

git pull -p upstream master    
git branch feature-branch    
git checkout feature-branch    

__...do your edits and test...__    
__...Stage and Commit changes...__  (git status, git add, git commit)


git checkout master    
git pull upstream master    
git push origin master    
git checkout feature-branch    
git merge master    
git push origin feature-branch    
 
__...make your Pull Request from your fork remote feature branch. Then after your PR is successful...__     

git checkout master    
git pull upstream master    
git branch -d feature-branch    
git push -d origin feature-branch    
git push origin master    
