@echo off
@rem -------------------------------------------------------------------------
@rem Gradle startup script for Windows
@rem -------------------------------------------------------------------------

@if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%"=="" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%

@rem Resolve any "." and ".." in APP_HOME to make it shorter.
for %%i in ("%APP_HOME%") do set APP_HOME=%%~fi

@rem Add default JVM options here if desired, e.g. -Xmx64m -Xms64m
set DEFAULT_JVM_OPTS=

set CLASSPATH=%APP_HOME%\gradle\wrapper\gradle-wrapper.jar

@rem Locate Java executable
set JAVA_EXE=java.exe
if defined JAVA_HOME set JAVA_EXE=%JAVA_HOME%\bin\java.exe

if not exist "%JAVA_EXE%" (
  echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH. 1>&2
  echo. 1>&2
  echo Please set the JAVA_HOME variable in your environment to match the 1>&2
  echo location of your Java installation. 1>&2
  exit /b 1
)

set WRAPPER_MAIN=org.gradle.wrapper.GradleWrapperMain

@rem Pass through all command line args to Gradle
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% -classpath "%CLASSPATH%" %WRAPPER_MAIN% %*

set EXIT_CODE=%ERRORLEVEL%
if "%OS%"=="Windows_NT" endlocal & set EXIT_CODE=%EXIT_CODE%
exit /b %EXIT_CODE%

