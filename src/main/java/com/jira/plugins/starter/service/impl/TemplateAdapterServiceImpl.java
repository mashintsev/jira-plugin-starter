package com.jira.plugins.starter.service.impl;

import com.atlassian.jira.template.TemplateSources;
import com.atlassian.jira.template.VelocityTemplatingEngine;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.templaterenderer.TemplateRenderer;
import com.jira.plugins.starter.service.TemplateAdapterService;
import java.io.IOException;
import java.io.StringWriter;
import java.util.Map;
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
  public String renderTemplateAsAtlassianRenderer() throws IOException {
    return velocityTemplatingEngine
        .render(
            TemplateSources.file("/com/jira/plugins/starter/templates/custom/custom_template.vm"))
        .asHtml();
  }

  @Override
  public String renderTemplateAsVelocityRenderer() throws IOException {
    StringWriter writer = new StringWriter();
    templateRenderer.render(
        "/com/jira/plugins/starter/templates/custom/custom_template.vm", Map.of(), writer);
    return writer.toString();
  }
}
