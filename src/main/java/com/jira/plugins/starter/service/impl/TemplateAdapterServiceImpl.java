package com.jira.plugins.starter.service.impl;

import com.atlassian.jira.template.TemplateSources;
import com.atlassian.jira.template.VelocityTemplatingEngine;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.jira.plugins.starter.service.TemplateAdapterService;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Component;

@Component
public class TemplateAdapterServiceImpl implements TemplateAdapterService {
  private final VelocityTemplatingEngine velocityManager;

  public TemplateAdapterServiceImpl(@ComponentImport VelocityTemplatingEngine velocityManager) {
    this.velocityManager = velocityManager;
  }

  @Override
  public String renderTemplate(String templatePath) throws IOException {
    return velocityManager
        .render(
            TemplateSources.fragment(
                FileUtils.readFileToString(new File(templatePath), StandardCharsets.UTF_8)))
        .asHtml();
  }
}
