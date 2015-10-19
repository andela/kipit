# Contributing to Kipit

 - [Getting Started](#gs)
 - [Issues and Bugs](#issue)
 - [Submission Guidelines](#submit)
 - [Making Changes](#mc)
 - [Git Commit Guidelines](#commit)
 - [Setting up Commit Template](#scttmp)
 - [Submitting Changes](#sc)
 - [Code Guidelines](#cg)
 - [Additional Resources](#ar)


## <a name="gs"></a> Getting Started
We'd love if you contribute to our source code and make Kipit even better than it is! Here are the guidelines we'd like you to follow:


## <a name="issue"></a> Found an Issue?
If you find a bug in the source code or a mistake in the documentation, you can help us by submitting an issue to our [GitHub Repository](https://github.com/andela/Kipit/issues). Even better you can submit a Pull Request with a fix.

**Please see the Submission Guidelines below**.


## <a name="submit"></a> Submission Guidelines

### Submitting an Issue
Before you submit your issue search the archive, maybe your question was already answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue, but please do not report duplicate issues. 

* Open a Github issue, assuming one does not already exist.
  * Clearly describe the issue including steps to reproduce when it is a bug.
  * Make sure you fill in the earliest version that you know has the issue.

Providing the following information will increase the chances of your issue being dealt with quickly:

* **Overview of the Issue** - if an error is being thrown a non-minified stack trace helps
* **Reproduce the Error** - provide a live example (using [Plunker][plunker] or[JSFiddle][jsfiddle]) or a unambiguous set of steps.
* **Suggest a Fix** - if you can't fix the bug yourself, perhaps you can point to what might be causing the problem (line of code or commit)

#### Milestones
Every **milestone** is based on a Sprint which acts like a container for issues. The issues implement features that describe the sprint objective. This is important to Kipit because this is how we asscociate issues with specific features or project phase. You should check the milestones to see current sprint with issues that are open and needs to be fixed.

#### Sprints
Sprints are derived from related user stories and core requirements of the application during sprint reviews, they form the basis for each milestone.

#### Labels
Labels are used to categorize issues based on features and/or functionality of the project it addresses. e.g (User story, database, Chores, core requirements e.t.c)

#### Assignee
A contributor is allowed to self-assign or assign an open issue, and is also required to mention/pair with another contributor to work on assigned issue(s).

#### Comments
**Comments** allow anyone with access to the repository to provide feedback.

The following are used in comments for emphasis
 - :red_circle: denotes an unacceptable  solution to an issue/feature.
 - :green_heart: denotes acceptable implementation that could be sticked to. 
 - :yellow_heart: denotes the feature/issue could be better implemented.
 - :question: denotes a request for explanation on approach/solution committed.

## <a name="mc"></a> Making Changes

* Create a topic branch from where you want to base your work.
  * This is usually the staging branch.
  * Only target release branches if you are certain your fix must be on that
    branch.
  * To quickly create a topic branch based on staging; `git checkout -b
    issue/1/fix-server staging`. Please avoid working directly on the
    `master` or `staging` branches.
* Make commits of logical units.
* Check for unnecessary whitespace with `git diff --check` before committing.
* Make sure you have added the necessary tests for your changes.
* Run _all_ the tests to assure nothing else was accidentally broken.

## <a name="commit"></a> Git Commit Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more readable messages** that are easy to follow when looking through the **project history**.

### <a name="cmsg"></a>Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**. The header has a special format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub.

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

### Scope
The scope could be anything specifying place of the commit change. For example `$location`, `$browser`, `$compile`, `$rootScope`, `ngHref`, `ngClick`, `ngView`, etc...

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit **Closes**.

A detailed explanation can be found in this [article](http://adamsimpson.net/writing/git-commit-template). You can get a sample template [here](https://gist.github.com/Linell/bd8100c4e04348c7966d).

### <a name="sctmp"></a> Setting Up The Git Commit Message Template
A project template [.gitmessage.txt](https://github.com/andela/Kipit/blob/staging/.gitmessage.txt) is provided for use.

- Copy the *project template* into a local directory e.g /path/to/.gitmessage.txt
- Run **git config --local commit.template /path/to/.gitmessage.txt*** or edit **~/.gitconfig and add template = /path/to/.gitmessage.txt** under the *[commit]* block.
- Setup git default editor by running 
  '''
  git config core.editor = "/path/to/executable/for/editor" 
  e.g. git config core.editor = "C:\Program Files\Sublime Text 2\sublime_text.exe"
  '''
- use *git commit* to commit changes which loads the template, add commit message based on the [Guidelines](#cmsg)

## <a name="sc"></a> Submitting Changes

* Push your changes to a topic branch in your fork of the repository.
* Submit a pull request to the `andela/Kipit` repository.

## <a name="cg"></a> Code Guidelines
To ensure consistency throughout the source code, refer to the guidelines below

- [HTML CSS Guide 1](https://google.github.io/styleguide/htmlcssguide.xml)
- [HTML CSS Guide 2](http://codeguide.co/#html-style-script)
- [Javascript Guidelines](http://airbnb.io/javascript/)
- [Mozilla javascript Guides](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

#### Use of JSHint is Required

Contributing to this project required the use of JSHint for javascript syntax error identification 
and compliance with the project's coding conventions.

The plugin should be installed on any editor or IDE being used by the contributor.
A detailed installation instruction can be found at http://jshint.com/install/.

Further information and documentations is can also be found at http://jshint.com/ and http://jshint.com/docs/.


# <a name="ar"></a> Additional Resources

* [General GitHub documentation](http://help.github.com/)
* [GitHub pull request documentation](http://help.github.com/send-pull-requests/)
