package com.jira.plugins.starter.web.action;

import com.atlassian.jira.permission.GlobalPermissionKey;
import com.atlassian.jira.security.GlobalPermissionManager;
import com.atlassian.jira.security.request.RequestMethod;
import com.atlassian.jira.security.request.SupportedMethods;
import com.atlassian.jira.web.action.JiraWebActionSupport;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.sal.api.websudo.WebSudoRequired;
import javax.inject.Inject;

@WebSudoRequired
@SupportedMethods({RequestMethod.GET})
public class StarterPluginConfigureAction extends JiraWebActionSupport {
  // Don't delete because it need for JiraGlobalPermissionCondition
  private final GlobalPermissionManager globalPermissionManager;

  @Inject
  public StarterPluginConfigureAction(
      @ComponentImport GlobalPermissionManager globalPermissionManager) {
    this.globalPermissionManager = globalPermissionManager;
  }

  @Override
  public String doExecute() {
    if (getLoggedInUser() == null
        || !globalPermissionManager.hasPermission(
            GlobalPermissionKey.ADMINISTER, getLoggedInUser())) {
      return "securitybreach";
    }
    return SUCCESS;
  }
}
