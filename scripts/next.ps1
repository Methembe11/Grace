param(
  [ValidateSet("dev", "build", "start")]
  [string]$Mode = "dev"
)

$projectPath = Split-Path -Parent $PSScriptRoot
$driveLetters = @("Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F")
$selectedDrive = $null

foreach ($letter in $driveLetters) {
  $existing = Get-PSDrive -Name $letter -ErrorAction SilentlyContinue

  if ($existing) {
    $existingRoot = [System.IO.Path]::GetFullPath($existing.Root).TrimEnd([char]92)
    $projectRoot = [System.IO.Path]::GetFullPath($projectPath).TrimEnd([char]92)

    if ($existingRoot -eq $projectRoot) {
      $selectedDrive = "$($letter):"
      break
    }
  } else {
    $selectedDrive = "$($letter):"
    & subst.exe $selectedDrive $projectPath
    if ($LASTEXITCODE -ne 0) {
      throw "Could not create a temporary drive for the project path."
    }
    break
  }
}

if (-not $selectedDrive) {
  throw "No free drive letter was available for the project path."
}

Set-Location ($selectedDrive + [char]92)

switch ($Mode) {
  "dev"   { $nextArgs = @("dev", "--webpack") }
  "build" { $nextArgs = @("build", "--webpack") }
  "start" { $nextArgs = @("start") }
}

& node ".\node_modules\next\dist\bin\next" @nextArgs
exit $LASTEXITCODE
