const mappings = new Map();

mappings
    .set('jquery', {
        dependency: 'com.atlassian.plugins.jquery:jquery',
        import: {
            amd: 'jquery',
            var: 'jQuery',
        },
    })
    .set('jira/util/events', {
        dependency: 'jira.webresources:jira-events',
        import: {
            var: "require('jira/util/events')",
            amd: 'jira/util/events',
        },
    })
    .set('jira/util/events/types', {
        dependency: 'jira.webresources:jira-events',
        import: {
            var: "require('jira/util/events/types')",
            amd: 'jira/util/events/types',
        },
    })
    .set('jira/util/events/reasons', {
        dependency: 'jira.webresources:jira-events',
        import: {
            var: "require('jira/util/events/reasons')",
            amd: 'jira/util/events/reasons',
        },
    })
    .set('jira/util/urls', {
        dependency: 'jira.webresources:jira-urlhelpers',
        import: {
            var: "require('jira/util/urls')",
            amd: 'jira/util/urls',
        },
    })
    .set('wrm/require', {
        dependency: 'com.atlassian.plugins.atlassian-plugins-webresource-rest:web-resource-manager',
        import: {
            amd: 'wrm/require',
            var: 'WRM.require',
        },
    })
    .set('wrm/data', {
        dependency: 'com.atlassian.plugins.atlassian-plugins-webresource-plugin:data',
        import: {
            amd: 'wrm/data',
            var: 'WRM.data',
        },
    })
    .set('wrm/context-path', {
        dependency: 'com.atlassian.plugins.atlassian-plugins-webresource-plugin:context-path',
        import: {
            amd: 'wrm/context-path',
            var: 'AJS.contextPath',
        },
    })
    .set('wrm/format', {
        dependency: 'com.atlassian.plugins.atlassian-plugins-webresource-plugin:format',
        import: {
            var: 'require("wrm/format")',
            amd: 'wrm/format',
        },
    })
    .set('jira/api/projects', {
        dependency: 'com.atlassian.jira.jira-projects-plugin:projects-api',
        import: {
            var: 'require("jira/api/projects")',
            amd: 'jira/api/projects',
        },
    })
    .set('quick-edit/form/model/create-issue', {
        dependency: "com.atlassian.jira.jira-quick-edit-plugin:quick-form",
        import: {
            var: "require('quick-edit/form/model/create-issue')",
            amd: "quick-edit/form/model/create-issue",
        },
    })
    .set('quick-edit/form/configurable/create-issue', {
        dependency: "com.atlassian.jira.jira-quick-edit-plugin:quick-form",
        import: {
            var: "require('quick-edit/form/configurable/create-issue')",
            amd: "quick-edit/form/configurable/create-issue",
        },
    })
    .set("quick-edit/form/unconfigurable-create-issue", {
        dependency: "com.atlassian.jira.jira-quick-edit-plugin:quick-form",
        import: {
            var: "require('quick-edit/form/unconfigurable-create-issue')",
            amd: "quick-edit/form/unconfigurable-create-issue",
        },
    })
    .set("quick-edit/form/container", {
        dependency: "com.atlassian.jira.jira-quick-edit-plugin:quick-form",
        import: {
            var: "require('quick-edit/form/container')",
            amd: "quick-edit/form/container",
        },
    })
    .set("quick-edit/form/error/create-issue", {
        dependency: "com.atlassian.jira.jira-quick-edit-plugin:quick-form",
        import: {
            var: "require('quick-edit/form/error/create-issue')",
            amd: "quick-edit/form/error/create-issuer",
        },
    })
    .set('wrm/i18n', {
        dependency: 'com.atlassian.plugins.atlassian-plugins-webresource-plugin:i18n',
        import: {
            var: 'require("wrm/i18n")',
            amd: 'wrm/i18n',
        },
    })
    .set('jira/issue', {
        dependency: 'jira.webresources:jira-issuenavigator',
        import: {
            var: 'require("jira/issue")',
            amd: 'jira/issue',
        },
    })

module.exports = mappings;