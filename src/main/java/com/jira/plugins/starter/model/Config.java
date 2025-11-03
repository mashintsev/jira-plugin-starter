package com.jira.plugins.starter.model;

import net.java.ao.Entity;
import net.java.ao.schema.Unique;
import org.jetbrains.annotations.Nullable;

public interface Config extends Entity {
  @Unique
  String getPropertyKey();

  void setPropertyKey(String propertyKey);

  @Nullable
  String getPropertyValue();

  void setPropertyValue(@Nullable String propertyValue);
}
