#!/usr/bin/env tsx

/**
 * Environment Configuration Loader
 * Loads environment variables with priority: .env.local > environment variables
 */

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export interface EnvironmentConfig {
  RUBE_API_TOKEN?: string;
  COMPOSIO_API_KEY?: string;
  RUBE_LOG_LEVEL?: string;
  NODE_ENV?: string;
  [key: string]: string | undefined;
}

/**
 * ★ Insight ─────────────────────────────────────
 * Priority-based environment loading for flexible configuration
 * .env.local overrides allow local development without affecting production
 * Graceful fallback to system environment variables when files don't exist
 * ─────────────────────────────────────────────────
 */
export function loadEnvironment(): EnvironmentConfig {
  const cwd = process.cwd();

  // First priority: .env.local (local development overrides)
  const envLocalPath = path.join(cwd, '.env.local');
  if (fs.existsSync(envLocalPath)) {
    console.log('🔧 Loading environment from .env.local');
    dotenv.config({ path: envLocalPath, override: true });
  }

  // Second priority: existing environment variables
  // (dotenv won't override existing env vars by default)

  // Return typed environment configuration
  return {
    RUBE_API_TOKEN: process.env.RUBE_API_TOKEN,
    COMPOSIO_API_KEY: process.env.COMPOSIO_API_KEY,
    RUBE_LOG_LEVEL: process.env.RUBE_LOG_LEVEL || 'info',
    NODE_ENV: process.env.NODE_ENV || 'development',
    ...process.env
  } as EnvironmentConfig;
}

/**
 * Load and validate required environment variables for Twitter operations
 */
export function validateTwitterEnvironment(): { valid: boolean; missing: string[] } {
  const env = loadEnvironment();
  const required = ['RUBE_API_TOKEN'];
  const missing: string[] = [];

  for (const key of required) {
    if (!env[key]) {
      missing.push(key);
    }
  }

  return {
    valid: missing.length === 0,
    missing
  };
}

/**
 * ★ Insight ─────────────────────────────────────
 * MCP configuration template expansion with environment variables
 * Handles ${VAR_NAME} syntax for secure credential injection
 * Returns properly formatted configuration for Claude Code SDK
 * ─────────────────────────────────────────────────
 */
export function expandEnvironmentVariables(template: string, env: EnvironmentConfig): string {
  return template.replace(/\$\{([^}]+)\}/g, (match, varName) => {
    const value = env[varName];
    if (value === undefined) {
      console.warn(`⚠️  Environment variable ${varName} not found, using empty string`);
      return '';
    }
    return value;
  });
}

export default loadEnvironment;