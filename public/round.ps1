Add-Type -AssemblyName System.Drawing
$imgPath = "c:\WEB DAN APLIKASI\WEBSITE JUBEL\public\logo.jpg"
$outPath = "c:\WEB DAN APLIKASI\WEBSITE JUBEL\public\icon.png"

$img = [System.Drawing.Image]::FromFile($imgPath)
$bmp = New-Object System.Drawing.Bitmap $img.Width, $img.Height
$g = [System.Drawing.Graphics]::FromImage($bmp)

$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::Transparent)

$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$radius = 100 # Adjust radius
$rect = New-Object System.Drawing.Rectangle 0, 0, $img.Width, $img.Height
$path.AddArc($rect.X, $rect.Y, $radius, $radius, 180, 90)
$path.AddArc($rect.Width - $radius, $rect.Y, $radius, $radius, 270, 90)
$path.AddArc($rect.Width - $radius, $rect.Height - $radius, $radius, $radius, 0, 90)
$path.AddArc($rect.X, $rect.Height - $radius, $radius, $radius, 90, 90)
$path.CloseFigure()

$g.SetClip($path)
$g.DrawImage($img, $rect)

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$img.Dispose()
