import type { ComputedRef } from 'vue';

export type TUserBaseType = {
  name: string;
  age: number;
  userAddress: string;
};
export type TUserJobType = {
  companyName: string;
  jobTitle: string;
  seniority: number;
  companyAddress: string;
};
// type Tinfo = { name:string; age:number; email:string; }
// type Titem = { title:string }
// type Tlist = {txt:string; isShow:boolean;}
// type TlistArr = {id:number;name:string;}
// type TcheckArr = { name:string; isSelect:boolean; id:number; }
export type Tphone = { url:string; }
export type TseoHome = { title:string; description:string; ogImage:string; }
export type Tcourses = {
  money:number;
  student:number;
  star:number;
  name:string;
  photo:string;
  description:string;
  url:string;
  moreUrl:string;
  id:number;
  teacher:{ name:string;img:string; };
}

export type TcityArr = { name:string; }
export type Tarea = { name:string; zip:string; }
export type Tcity = { name:string; area:Array<Tarea>; }
export type Ttwzip = { twzip:{city:Array<Tcity>}; jpzip?:Array<Tcity>; }

export type TerrorMsg = { username?:string; password?:string; email?:string; }

export type Tinfo = {
  username:string;
  password:string;
  email:string;
  sex:string;
  age:string | number;
  // terms:string;
  terms:ComputedRef<string>;
}
export type TpostLogin = { username:string; password:string; terms:boolean; }
export type TpostLoginData = { data:{name:string; token:string;}; }

type TloginData = { username:string; email:string; password:string; sex:string; age:number; terms:string; }
export type Tlogin = {
  data:TloginData;
  success:boolean;
}

export type Tmoive = { strText:string; strValue:string; }

export type TgitUser = { 
  login:string; 
  id:number;
  node_id:string;
  avatar_url:string;
  gravatar_id:string;
  url:string;
  html_url:string;
  followers_url:string;
  following_url:string;
  gists_url:string;
  starred_url:string;
  subscriptions_url:string;
  organizations_url:string;
  repos_url:string;
  events_url:string;
  received_events_url:string;
  type:string;
  user_view_type:string;
  site_admin:boolean;
  name:null | string;
  company:null;
  blog:string;
  location:null;
  email:null;
  hireable:null;
  bio:null;
  twitter_username:null;
  public_repos:number;
  public_gists:number;
  followers:number;
  following:number;
  created_at:string;
  updated_at:string;
}

export type TgitUserRepos = Pick<TgitUser,'id' | 'node_id' | 'name' | 'html_url' | 'url' | 'events_url' | 'created_at' | 'updated_at'> & {
  full_name:string;
  private:boolean;
  owner:any;//{}
  description:string;
  fork:boolean;
  forks_url:string;
  keys_url:string;
  collaborators_url:string;
  teams_url:string;
  hooks_url:string;
  issue_events_url:string;
  assignees_url:string;
  branches_url:string;
  tags_url:string;
  blobs_url:string;
  git_tags_url:string;
  git_refs_url:string;
  trees_url:string;
  statuses_url:string;
  languages_url:string;
  stargazers_url:string;
  contributors_url:string;
  subscribers_url:string;
  subscription_url:string;
  commits_url:string;
  git_commits_url:string;
  comments_url:string;
  issue_comment_url:string;
  contents_url:string;
  compare_url:string;
  merges_url:string;
  archive_url:string;
  downloads_url:string;
  issues_url:string;
  pulls_url:string;
  milestones_url:string;
  notifications_url:string;
  labels_url:string;
  releases_url:string;
  deployments_url:string;
  pushed_at:string;
  git_url:string;
  ssh_url:string;
  clone_url:string;
  svn_url:string;
  homepage:string;
  size:number;
  stargazers_count:number;
  watchers_count:number;
  language:string;
  has_issues:boolean;
  has_projects:boolean;
  has_downloads:boolean;
  has_wiki:boolean;
  has_pages:boolean;
  has_discussions:boolean;
  forks_count:number;
  mirror_url:null;
  archived:boolean;
  disabled:boolean;
  open_issues_count:number;
  license:any;// {}
  allow_forking:boolean;
  is_template:boolean;
  web_commit_signoff_required:boolean;
  topics:string[];
  visibility:string;
  forks:number;
  open_issues:number;
  watchers:number;
  default_branch:string;
}
