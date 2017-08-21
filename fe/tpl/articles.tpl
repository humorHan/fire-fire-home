{{each data}}
    <a class="article" href="{{$value.articleURL}}.html?articleId={{$value.id}}" target="_blank">
        <span class="right font12">{{$value.createTime | dateFormat 'yyyy-MM-dd hh:mm:ss'}}</span>
        <h3 class="article-title">{{$value.title}}</h3>
        <div class="article-label">{{$value.label | labelFormat}}</div>
        <div>{{$value.summary}}</div>
    </a>
{{/each}}