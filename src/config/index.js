import { hasFeatureFlagEnabled } from '@edx/frontend-enterprise-utils';

import {
  FEATURE_ENROLL_WITH_CODES,
  FEATURE_ENABLE_PROGRAMS,
  FEATURE_ENABLE_PATHWAYS,
  FEATURE_ENABLE_COURSE_REVIEW,
  FEATURE_ENABLE_PATHWAY_PROGRESS,
  FEATURE_ENABLE_MY_CAREER,
  FEATURE_PROGRAM_TYPE_FACET,
  FEATURE_ENABLE_AUTO_APPLIED_LICENSES,
  FEATURE_ENROLL_WITH_ENTERPRISE_OFFERS,
  FEATURE_ENABLE_TOP_DOWN_ASSIGNMENT,
  FEATURE_ENABLE_VIDEO_CATALOG,
  FEATURE_ENABLE_ACADEMY_PATHWAYS,
} from './constants';

export const features = {
  ENABLE_AUTO_APPLIED_LICENSES: (
    process.env.FEATURE_ENABLE_AUTO_APPLIED_LICENSES || hasFeatureFlagEnabled(FEATURE_ENABLE_AUTO_APPLIED_LICENSES)
  ),
  ENROLL_WITH_CODES: process.env.FEATURE_ENROLL_WITH_CODES || hasFeatureFlagEnabled(FEATURE_ENROLL_WITH_CODES),
  ENABLE_PROGRAMS: process.env.FEATURE_ENABLE_PROGRAMS || hasFeatureFlagEnabled(FEATURE_ENABLE_PROGRAMS),
  ENABLE_PATHWAYS: process.env.FEATURE_ENABLE_PATHWAYS || hasFeatureFlagEnabled(FEATURE_ENABLE_PATHWAYS),
  ENABLE_COURSE_REVIEW: process.env.FEATURE_ENABLE_COURSE_REVIEW || hasFeatureFlagEnabled(FEATURE_ENABLE_COURSE_REVIEW),
  PROGRAM_TYPE_FACET: process.env.FEATURE_PROGRAM_TYPE_FACET || hasFeatureFlagEnabled(FEATURE_PROGRAM_TYPE_FACET),
  FEATURE_ENROLL_WITH_ENTERPRISE_OFFERS: process.env.FEATURE_ENROLL_WITH_ENTERPRISE_OFFERS
    || hasFeatureFlagEnabled(FEATURE_ENROLL_WITH_ENTERPRISE_OFFERS),
  FEATURE_ENABLE_PATHWAY_PROGRESS: process.env.FEATURE_ENABLE_PATHWAY_PROGRESS
    || hasFeatureFlagEnabled(FEATURE_ENABLE_PATHWAY_PROGRESS),
  FEATURE_ENABLE_MY_CAREER: process.env.FEATURE_ENABLE_MY_CAREER
    || hasFeatureFlagEnabled(FEATURE_ENABLE_MY_CAREER),
  FEATURE_ENABLE_TOP_DOWN_ASSIGNMENT: process.env.FEATURE_ENABLE_TOP_DOWN_ASSIGNMENT
    || hasFeatureFlagEnabled(FEATURE_ENABLE_TOP_DOWN_ASSIGNMENT),
  FEATURE_ENABLE_VIDEO_CATALOG: process.env.FEATURE_ENABLE_VIDEO_CATALOG
    || hasFeatureFlagEnabled(FEATURE_ENABLE_VIDEO_CATALOG),
  FEATURE_ENABLE_ACADEMY_PATHWAYS: process.env.FEATURE_ENABLE_ACADEMY_PATHWAYS
    || hasFeatureFlagEnabled(FEATURE_ENABLE_ACADEMY_PATHWAYS),
};
