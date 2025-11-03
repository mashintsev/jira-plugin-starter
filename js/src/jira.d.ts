declare module "AJS" {
  const AJS: {
    toInit: (arg: () => void) => void;
  };
  export default AJS;
}

declare module "jquery";
declare module "JIRA";
declare module "aui-select2";

declare module "wrm/context-path";
declare module "wrm/format";

declare module "@atlassian/wrm-react-i18n";
declare module "i18n";

declare module "jira/util/events/types";
declare module "jira/util/events/reasons";
declare module "jira/util/events";
