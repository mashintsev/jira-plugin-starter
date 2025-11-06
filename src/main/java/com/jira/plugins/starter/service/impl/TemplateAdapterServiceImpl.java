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
import java.nio.file.Paths;
import org.apache.commons.io.FileUtils;
import java.nio.file.Path;
import java.nio.file.InvalidPathException;

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
  // Define the template base directory. Update path as needed for your deployment.
  private static final Path TEMPLATE_BASE_DIR = Paths.get("templates").toAbsolutePath().normalize();

  // Validate the path does not escape the base directory.
  private void validateTemplatePath(String templatePath) throws IOException {
    Path resolved;
    try {
      resolved = TEMPLATE_BASE_DIR.resolve(templatePath).normalize();
    } catch (InvalidPathException ex) {
      throw new IOException("Invalid template path");
    }
    if (!resolved.startsWith(TEMPLATE_BASE_DIR)) {
      throw new IOException("Template path is outside permitted directory");
    }
    File file = resolved.toFile();
    if (!file.exists() || !file.isFile()) {
      throw new IOException("Template file does not exist");
    }
  }


  @Override
    validateTemplatePath(templatePath);
    Path resolved = TEMPLATE_BASE_DIR.resolve(templatePath).normalize();
  public String renderTemplateAsAtlassianRenderer(String templatePath) throws IOException {
    return velocityTemplatingEngine
        .render(
            TemplateSources.fragment(
                FileUtils.readFileToString(resolved.toFile(), StandardCharsets.UTF_8)))
        .asHtml();
  }

  @Override
    validateTemplatePath(templatePath);
    Path resolved = TEMPLATE_BASE_DIR.resolve(templatePath).normalize();
  public String renderTemplateAsVelocityRenderer(String templatePath) throws IOException {
    return templateRenderer.renderFragment(
        FileUtils.readFileToString(resolved.toFile(), StandardCharsets.UTF_8), Map.of());
  }
}
