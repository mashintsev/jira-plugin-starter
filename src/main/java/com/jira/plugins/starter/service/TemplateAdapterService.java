package com.jira.plugins.starter.service;

import java.io.IOException;

public interface TemplateAdapterService {

  String renderTemplate(String templatePath) throws IOException;
}
