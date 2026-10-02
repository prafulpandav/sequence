# PowerShell script to copy sequence images from root to public/sequence
$TargetDir = Join-Path $PSScriptRoot "..\public\sequence"
if (-not (Test-Path $TargetDir)) {
    New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
}

$files = Get-ChildItem -Path (Join-Path $PSScriptRoot "..") -Filter "frame_*" | Where-Object { $_.Extension -match "\.(png|webp)$" }
foreach ($file in $files) {
    Copy-Item -Path $file.FullName -Destination $TargetDir -Force
}

Write-Host "Successfully synced $($files.Count) sequence frames into public/sequence/"
