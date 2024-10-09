/**
 * External dependencies
 */
import { getOctokit } from '@actions/github';
class GitHubAPI {
  #octokit;
  #repo;
  constructor(token, repo) {
    this.#octokit = getOctokit(token);
    this.#repo = repo;
  }
  async fetchAllIssuesLabeledFlaky(label) {
    const issues = await this.#octokit.paginate(this.#octokit.rest.issues.listForRepo, {
      ...this.#repo,
      state: 'all',
      labels: label
    });
    return issues;
  }
  async findMergeBaseCommit(baseCommit, headCommit) {
    const {
      data
    } = await this.#octokit.rest.repos.compareCommits({
      ...this.#repo,
      base: baseCommit,
      head: headCommit,
      per_page: 1
    });
    return data.merge_base_commit.commit;
  }
  async updateIssue(params) {
    const {
      data
    } = await this.#octokit.rest.issues.update({
      ...this.#repo,
      ...params
    });
    return data;
  }
  async createIssue(params) {
    const {
      data
    } = await this.#octokit.rest.issues.create({
      ...this.#repo,
      ...params
    });
    return data;
  }
  async createCommentOnCommit(sha, body, isReportComment) {
    const {
      data: comments
    } = await this.#octokit.rest.repos.listCommentsForCommit({
      ...this.#repo,
      commit_sha: sha
    });
    const reportComment = comments.find(comment => isReportComment(comment.body));
    if (reportComment) {
      const {
        data
      } = await this.#octokit.rest.repos.updateCommitComment({
        ...this.#repo,
        comment_id: reportComment.id,
        body
      });
      return data;
    }
    const {
      data
    } = await this.#octokit.rest.repos.createCommitComment({
      ...this.#repo,
      commit_sha: sha,
      body
    });
    return data;
  }
  async createCommentOnPR(prNumber, body, isReportComment) {
    let reportComment;
    let page = 1;
    while (!reportComment) {
      const {
        data: comments
      } = await this.#octokit.rest.issues.listComments({
        ...this.#repo,
        issue_number: prNumber,
        page
      });
      reportComment = comments.find(comment => comment.body && isReportComment(comment.body));
      if (comments.length > 0) {
        page += 1;
      } else {
        break;
      }
    }
    if (reportComment) {
      const {
        data
      } = await this.#octokit.rest.issues.updateComment({
        ...this.#repo,
        comment_id: reportComment.id,
        body
      });
      return data;
    }
    const {
      data
    } = await this.#octokit.rest.issues.createComment({
      ...this.#repo,
      issue_number: prNumber,
      body
    });
    return data;
  }
}
export { GitHubAPI };
//# sourceMappingURL=github-api.js.map