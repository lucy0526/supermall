import {
  request2
} from "./request";

export function detailByTitleRequest(title) {
  return request2({
    // url: "/blog?title="+title
    url: '/blog',
    params: {
      title
    }
  })
}

export class Blog{
  constructor(blog){
    this.title = blog.title;
    this.nature = blog.nature;
    this.description = blog.description;
    this.createtime = blog.createtime;
    this.updatetime = blog.updatetime;
    this.id = blog.id;
    this.view= blog.view;
    this.recommend = blog.recommend;
    this.supportreview = blog.supportreview;
    
    this.firstpicture = blog.firstpicture;
    
    // this.type = blog.type;
    this.name = blog.type.name;
    this.content = blog.content;
  }
}