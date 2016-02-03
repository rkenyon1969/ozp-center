# How to contribute

Third-party patches are essential for keeping continuing to evolve Ozone. The core development team can't 
work all the request for features across the myriad configurations for running
Ozone. We want to keep it as easy as possible to contribute changes that
get things working in your environment without breaking things in others. There are a few guidelines that we
need contributors to follow so that we can have a chance of keeping on top of things.

## Getting Started

* Make sure you have a [GitHub account](https://github.com/signup/free)
* Setup your development environment [Developer Setup](https://github.com/ozone-development/ozp-documentation/wiki/Developer_Setup)
* Submit a ticket for your issue, assuming one does not already exist.
  * Clearly describe the issue including steps to reproduce when it is a bug.
  * Make sure you fill in the earliest version that you know has the issue.
* Fork the repository on GitHub

## Making Changes

* Create a topic branch from where you want to base your work.
  * This should always be from the master branch.
  * Only target release branches if you are certain your fix must be on that
    branch.
  * To quickly create a topic branch based on master; `git checkout -b fix/master/my_contribution master`.
* Make commits of logical units.
* Check for unnecessary whitespace with `git diff --check` before committing.
* Make sure your commit messages are in the proper format.

```
<type>(<scope>): <subject> <issue #>
```
   * Examples
    * `feat(Navbar): Added Navbar to top of page #45` 
    * `bug(Submit Button) fixed form submit button #121`
    * `chore(tag/release) release-X.Y.Z` 
    * `fix(menu) fixed broken link #92`
    

* Make sure you have added the necessary tests for your changes.
* Run _all_ the tests to assure nothing else was accidentally broken.

## Submitting Changes

* By Submitting a pull request you are agreeing to the [Contributor License Agreement](https://github.com/ozone-development/ozp-documentation/blob/master/cla.md)
* Push your changes to a topic branch in your fork of the repository.
* Submit a pull request to the repository in the ozone-development organization.
* Update GitHub issue to mark that you have submitted code and are ready for it to be reviewed (Status: Ready for Merge).
  * Include a link to the pull request in the ticket.
* Feedback will be given directly in the GitHub Pull request Ticket
* After feedback has been given we expect responses within two weeks. After two
  weeks we may close the pull request if it isn't showing any activity.

# Additional Resources



* [Ozone Guidelines](https://github.com/ozone-development/ozp-documentation)
* [Contributor License Agreement](https://github.com/ozone-development/ozp-documentation/blob/master/cla.md)
* [General GitHub documentation](https://help.github.com/)
* [GitHub pull request documentation](https://help.github.com/send-pull-requests/)
* [ozoneplatform-users mailing list](https://groups.google.com/forum/#!forum/ozoneplatform-users)