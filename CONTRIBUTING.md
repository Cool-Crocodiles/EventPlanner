Git Workflow

Setup

1)	Fork the official repo (https://github.com/Cool-Crocodiles/EventPlanner)
2)	Clone this forked repo (for example https://github.com/tignashchenko/EventPlanner.git).
3)	Add the official repo as upstream (git remote add upstream https://github.com/Cool-Crocodiles/EventPlanner.git)

Work flow

1)	Create a new branch to work on the feature. Do not work on your master branch (git checkout –b name-of-feature-branch). This will create the new branch and put you on it.
2)	Make all your work and commits on this branch.
3)	When you finish all your work make sure you are still on your feature branch and run this command (git pull --rebase upstream master) and this will make sure that there are no conflicts between your changes and what is on the main repo (this should not be an issue since we will not be working on the same files.
4)	Once the rebase process successfully completes, push everything to your origin repo. If for some reason you will get errors here, just force your push (git push –f origin name-of-feature-branch).
5)	Once this is done, submit a pull request from your repo to the official group repo.
6)	Others will review it and if it is ok, it will be merged.
7)	After your pull request is approved and it is merged, go to your master branch and make a git pull upstream master. This should have your changes incorporated in the official group repo.
8)	Update your local repo with git push origin master.
