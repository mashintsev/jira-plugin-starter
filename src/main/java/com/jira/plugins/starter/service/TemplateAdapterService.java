package com.jira.plugins.starter.service;

import java.io.IOException;

public interface TemplateAdapterService {

  String renderTemplateAsAtlassianRenderer(String templatePath) throws IOException;

  String renderTemplateAsVelocityRenderer(String templatePath) throws IOException;
}
