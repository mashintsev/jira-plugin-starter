package com.jira.plugins.starter.service;

import java.io.IOException;

public interface TemplateAdapterService {

  String renderTemplateAsAtlassianRenderer() throws IOException;

  String renderTemplateAsVelocityRenderer() throws IOException;
}
