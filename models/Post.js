//Post模型
var keystone = require('keystone'),
    Types = keystone.Field.Types;

//构造new keystone.List(key[, options])
var Post = new keystone.List('Post', {
    autokey: {
        path: 'slug',
        from: 'title',
        unique: true
    },
    map: {
        name: 'title'
    },
    drilldown: 'author',
    defaultSort: '-createdAt'
});

/**
 * MyList.add(fields)添加域（键值对象）
 * @type {Post}
 */
Post.add({
    title: {
        type: String,
        require: true
    },
    state: {
        type: Types.Select,
        options: 'draft, published, archived',
        default: 'draft'
    }, //author是Post与User模型的关系
    author: {
        type: Types.Relationship,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    publishedAt: Date,
    // image: {
    //     type: Types.CloudinaryImage
    // },
    content: {
        brief: {
            type: Types.Html,
            wysiwyg: true,
            height: 150
        },
        extender: {
            type: Types.Html,
            wysiwyg: true,
            height: 400
        }
    }
});

//在管理界面的列表视图中默认显示的列清单，用逗号分隔。 你可以在管道符|后面用像素或百分比指定宽度。
Post.defaultColumns = 'title, state|20%, author, publishedAt|15%';

//注册列表，并最终确定它的配置。
Post.register();
