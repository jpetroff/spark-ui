
.PHONY: import update-upstream verify-imports bootstrap-upstream
# Accept exactly one positional component; unrelated unknown targets remain errors.
ifeq ($(firstword $(MAKECMDGOALS)),import)
IMPORT_POSITIONAL := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
ifneq ($(words $(IMPORT_POSITIONAL)),0)
ifneq ($(words $(IMPORT_POSITIONAL)),1)
$(error Usage: make import <component> or make import COMPONENT=<component>)
endif
ifneq ($(strip $(COMPONENT)),)
$(error Choose positional component or COMPONENT, not both)
endif
COMPONENT := $(IMPORT_POSITIONAL)
$(IMPORT_POSITIONAL): import
	@:
endif
endif

serena:
	uvx --from git+https://github.com/oraios/serena serena start-mcp-server --transport streamable-http --port 9121 --project-from-cwd --context codex

import:
	@test -n "$(COMPONENT)" || (echo 'Usage: make import <component>'; exit 1)
	@node scripts/vendor/command.ts "$(COMPONENT)" $(if $(DRY_RUN),--dry-run,)

update-upstream:
	@ARK_REF="$(ARK_REF)" ZAG_REF="$(ZAG_REF)" node scripts/vendor/update.ts

bootstrap-upstream:
	@node scripts/vendor/update.ts --bootstrap

verify-imports:
	@node scripts/vendor/import.ts verify
