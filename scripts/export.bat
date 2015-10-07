xcopy "%1..\..\Apps\CollisionsOnline\CollisionsOnline\Client" "%1CollisionsOnline\Client" /Y /I /S
xcopy "%1..\..\Apps\CollisionsOnline\CollisionsOnline\Server" "%1CollisionsOnline\Server" /Y /I /S
xcopy "%1..\..\Apps\CollisionsOnline\Lib\Client" "%1Lib\Client" /Y /I /S /EXCLUDE:%2
