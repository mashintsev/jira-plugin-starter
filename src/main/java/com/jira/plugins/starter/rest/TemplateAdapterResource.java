package com.jira.plugins.starter.rest;

import com.jira.plugins.starter.service.TemplateAdapterService;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import java.io.IOException;

@Path("templates")
public class TemplateAdapterResource {

  private final TemplateAdapterService templateAdapterService;

  @Inject
  public TemplateAdapterResource(TemplateAdapterService templateAdapterService) {
    this.templateAdapterService = templateAdapterService;
  }

  @GET
  @Path("renderAsRenderer")
  @Produces("text/html; charset=UTF-8")
  public String renderAsRenderer() throws IOException {
    return templateAdapterService.renderTemplateAsAtlassianRenderer();
  }

  @GET
  @Path("renderAsVelocity")
  @Produces("text/html; charset=UTF-8")
  public String renderAsVelocity() throws IOException {
    return templateAdapterService.renderTemplateAsVelocityRenderer();
  }
}
