package com.jira.plugins.starter.service.impl;

import com.atlassian.jira.template.TemplateSources;
import com.atlassian.jira.template.VelocityTemplatingEngine;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.templaterenderer.TemplateRenderer;
import com.jira.plugins.starter.service.TemplateAdapterService;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Component;

@Component
public class TemplateAdapterServiceImpl implements TemplateAdapterService {
  private final VelocityTemplatingEngine velocityTemplatingEngine;
  private final TemplateRenderer templateRenderer;

  public TemplateAdapterServiceImpl(
      @ComponentImport VelocityTemplatingEngine velocityTemplatingEngine,
      @ComponentImport TemplateRenderer templateRenderer) {
    this.velocityTemplatingEngine = velocityTemplatingEngine;
    this.templateRenderer = templateRenderer;
  }

  @Override
  public String renderTemplateAsAtlassianRenderer(String templatePath) throws IOException {
    return velocityTemplatingEngine
        .render(
            TemplateSources.fragment(
                FileUtils.readFileToString(new File(templatePath), StandardCharsets.UTF_8)))
        .asHtml();
  }

  @Override
  public String renderTemplateAsVelocityRenderer(String templatePath) throws IOException {
    return templateRenderer.renderFragment(
        FileUtils.readFileToString(new File(templatePath), StandardCharsets.UTF_8), Map.of());
  }
}
